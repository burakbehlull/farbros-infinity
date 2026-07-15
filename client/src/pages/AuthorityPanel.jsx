import { useEffect, useState } from 'react';
import { serverAPI } from '@requests';
import serverStore from '@store/serverStore';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@ui';
import { X } from 'lucide-react';

const LEVELS = ['high', 'mid', 'low'];

function AuthorityPanel() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const { serverId } = serverStore();

  // For adding items
  const [addInputs, setAddInputs] = useState({
    high: { member: '', role: '', authority: '' },
    mid: { member: '', role: '', authority: '' },
    low: { member: '', role: '', authority: '' }
  });

  // Fetch config
  const fetchConfig = async () => {
    if (!serverId) return;
    try {
      const result = await serverAPI.getServerConfig(serverId);
      console.log('Config fetch result:', result);
      if (result?.success && result?.data) {
        setConfig(result.data);
      } else {
        console.error('Config fetch failed:', result);
      }
    } catch (err) {
      console.error('Config fetch error:', err);
    }
  };

  // Update level config
  const updateLevelConfig = async (level, key, value) => {
    if (!serverId || !config) return;

    setLoading(true);
    try {
      const updatedConfig = {
        ...config,
        [level]: {
          ...config[level],
          [key]: value
        }
      };

      const result = await serverAPI.updateGuildConfig(serverId, updatedConfig);
      console.log('Update result:', result);
      if (result?.success) {
        setConfig(updatedConfig);
      } else {
        console.error('Update failed:', result);
      }
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add item
  const addItem = async (level, type, value) => {
    if (!serverId || !value.trim()) return;

    try {
      const result = await serverAPI.addSafeItemConfig(serverId, {
        level,
        type,
        data: value.trim()
      });
      console.log('Add item result:', result);
      if (result?.success) {
        fetchConfig(); // Refresh config
        // Reset input
        setAddInputs(prev => ({
          ...prev,
          [level]: { ...prev[level], [type]: '' }
        }));
      } else {
        console.error('Add item failed:', result);
      }
    } catch (err) {
      console.error('Add item error:', err);
    }
  };

  // Remove item
  const removeItem = async (level, type, value) => {
    if (!serverId) return;

    try {
      const result = await serverAPI.removeSafeItemConfig(serverId, {
        level,
        type,
        data: value
      });
      console.log('Remove item result:', result);
      if (result?.success) {
        fetchConfig(); // Refresh config
      } else {
        console.error('Remove item failed:', result);
      }
    } catch (err) {
      console.error('Remove item error:', err);
    }
  };

  // Input change handler
  const handleInputChange = (level, type, value) => {
    setAddInputs(prev => ({
      ...prev,
      [level]: { ...prev[level], [type]: value }
    }));
  };

  useEffect(() => {
    fetchConfig();
  }, [serverId]);

  if (!serverId) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Yetki Paneli</CardTitle>
            <CardDescription>Lütfen önce Durum Paneli'nden bir sunucu seçin</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Yetki Paneli</CardTitle>
          <CardDescription>Her yetki seviyesi için ayarları yapılandırın ({serverId} için özel)</CardDescription>
        </CardHeader>
        <CardContent>
          {config && (
            <Tabs defaultValue="high">
              <TabsList className="grid w-full grid-cols-3">
                {LEVELS.map(level => (
                  <TabsTrigger key={level} value={level}>
                    {level.toUpperCase()} Seviye
                  </TabsTrigger>
                ))}
              </TabsList>

              {LEVELS.map(level => (
                <TabsContent key={level} value={level} className="space-y-6 mt-4">
                  {/* Toggles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <Label htmlFor={`${level}-enable`} className="font-medium">Etkinleştir</Label>
                      <Switch
                        id={`${level}-enable`}
                        checked={!!config[level]?.enable}
                        onCheckedChange={(checked) => updateLevelConfig(level, 'enable', checked)}
                        disabled={loading}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <Label htmlFor={`${level}-isAuthorities`} className="font-medium">Yetki Kontrolü</Label>
                      <Switch
                        id={`${level}-isAuthorities`}
                        checked={!!config[level]?.isAuthorities}
                        onCheckedChange={(checked) => updateLevelConfig(level, 'isAuthorities', checked)}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Members */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Üyeler</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Üye ID"
                        value={addInputs[level].member}
                        onChange={(e) => handleInputChange(level, 'member', e.target.value)}
                      />
                      <Button onClick={() => addItem(level, 'members', addInputs[level].member)}>
                        Ekle
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {config[level]?.members?.length > 0 ? config[level].members.map(memberId => (
                        <Badge key={memberId} variant="secondary" className="flex items-center gap-2 px-3 py-1">
                          <span>{memberId}</span>
                          <button
                            onClick={() => removeItem(level, 'members', memberId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )) : (
                        <p className="text-sm text-muted-foreground">Henüz üye eklenmemiş</p>
                      )}
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Roller</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Rol ID"
                        value={addInputs[level].role}
                        onChange={(e) => handleInputChange(level, 'role', e.target.value)}
                      />
                      <Button onClick={() => addItem(level, 'roles', addInputs[level].role)}>
                        Ekle
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {config[level]?.roles?.length > 0 ? config[level].roles.map(roleId => (
                        <Badge key={roleId} variant="outline" className="flex items-center gap-2 px-3 py-1">
                          <span>{roleId}</span>
                          <button
                            onClick={() => removeItem(level, 'roles', roleId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )) : (
                        <p className="text-sm text-muted-foreground">Henüz rol eklenmemiş</p>
                      )}
                    </div>
                  </div>

                  {/* Authorities */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Yetkiler</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Yetki adı (örn: ManageChannels)"
                        value={addInputs[level].authority}
                        onChange={(e) => handleInputChange(level, 'authority', e.target.value)}
                      />
                      <Button onClick={() => addItem(level, 'authorities', addInputs[level].authority)}>
                        Ekle
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {config[level]?.authorities?.length > 0 ? config[level].authorities.map(auth => (
                        <Badge key={auth} variant="default" className="flex items-center gap-2 px-3 py-1">
                          <span>{auth}</span>
                          <button
                            onClick={() => removeItem(level, 'authorities', auth)}
                            className="text-red-100 hover:text-red-300 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )) : (
                        <p className="text-sm text-muted-foreground">Henüz yetki eklenmemiş</p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthorityPanel;

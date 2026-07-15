import { useEffect, useState } from 'react';
import { serverAPI } from '@requests';
import serverStore from '@store/serverStore';
import { penalties } from '@data';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, ScrollArea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch } from '@ui';

// Guard list
const GUARD_LIST = [
  'roleDeleteGuard',
  'roleUpdateGuard',
  'channelDeleteGuard',
  'channelUpdateGuard',
  'botAddGuard',
  'webGuard',
  'memberRoleGuard',
  'guildUrlGuard',
  'guildUpdateGuard',
  'kickGuard',
  'banGuard',
  'kickBanLimitGuard',
  'messageCommandExecuter',
  'slashCommandExecuter',
];

function BotSettings() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const { serverId } = serverStore();

  // Fetch config
  const fetchConfig = async () => {
    if (!serverId) return;

    try {
      const result = await serverAPI.getServerConfig(serverId);
      console.log('BotSettings config fetch result:', result);
      if (result?.success && result?.data) {
        setConfig(result.data);
      } else {
        console.error('BotSettings config fetch failed:', result);
      }
    } catch (err) {
      console.error('BotSettings config fetch error:', err);
    }
  };

  // Handle input changes
  const handleChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle save
  const handleSave = async () => {
    if (!serverId || !config) return;

    setLoading(true);
    setSaveStatus('');
    try {
      // Sanitize: remove _id, __v, and guildId from data before sending
      const sanitizedConfig = (({ _id, __v, guildId, ...rest }) => {
        // Also sanitize high/mid/low to remove _id
        const sanitizeLevel = (level) => {
          if (!level) return level;
          const { _id, ...restLevel } = level;
          return restLevel;
        };
        return {
          ...rest,
          high: sanitizeLevel(rest.high),
          mid: sanitizeLevel(rest.mid),
          low: sanitizeLevel(rest.low)
        };
      })(config);
      
      console.log('Saving config:', sanitizedConfig);
      const result = await serverAPI.updateGuildConfig(serverId, sanitizedConfig);
      console.log('Save result:', result);
      
      if (result?.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        console.error('Save failed:', result);
        setSaveStatus('error');
      }
    } catch (err) {
      console.error('Save error:', err);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, [serverId]);

  if (!serverId) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Bot Ayarları</CardTitle>
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
          <CardTitle>Bot Ayarları</CardTitle>
          <CardDescription>Sunucu için bot koruma ve genel ayarlarını yapılandırın</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {config && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-8">
                {/* General Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Genel Ayarlar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Prefix</Label>
                      <Input
                        value={config.prefix || '.'}
                        onChange={(e) => handleChange('prefix', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Limit</Label>
                      <Input
                        type="number"
                        value={config.limit || 0}
                        onChange={(e) => handleChange('limit', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Log Kanal ID</Label>
                      <Input
                        value={config.logChannelId || ''}
                        onChange={(e) => handleChange('logChannelId', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Jail Rol ID</Label>
                      <Input
                        value={config.jailRoleId || ''}
                        onChange={(e) => handleChange('jailRoleId', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Ceza Tipi</Label>
                      <Select
                        value={config.punishmentType || 'ban'}
                        onValueChange={(val) => handleChange('punishmentType', val)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(penalties).map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Guard Toggles */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Koruma (Guard) Ayarları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {GUARD_LIST.map(guardKey => (
                      <div key={guardKey} className="flex items-center justify-between p-3 border rounded-md">
                        <Label htmlFor={guardKey} className="font-normal">
                          {guardKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <Switch
                          id={guardKey}
                          checked={!!config[guardKey]}
                          onCheckedChange={(checked) => handleChange(guardKey, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          {saveStatus === 'success' && (
            <p className="text-green-600 text-sm">Ayarlar başarıyla kaydedildi!</p>
          )}
          {saveStatus === 'error' && (
            <p className="text-red-600 text-sm">Ayarlar kaydedilirken bir hata oluştu!</p>
          )}
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BotSettings;

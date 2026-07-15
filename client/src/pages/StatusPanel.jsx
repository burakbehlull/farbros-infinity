import { useEffect, useState } from 'react';
import { botAPI, serverAPI } from '@requests';
import serverStore from '@store/serverStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui';

function StatusPanel() {
  const [servers, setServers] = useState([]);
  const [serverConfig, setServerConfig] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);
  const { serverId, setServerId } = serverStore();

  // Fetch servers from bot
  const getServers = async () => {
    const result = await botAPI.servers();
    if (result?.success && result?.data) {
      const serverList = Array.from(result.data.values()).map(guild => ({
        id: guild.id,
        name: guild.name
      }));
      setServers(serverList);
    }
  };

  // Fetch server config and info
  const fetchServerData = async (id) => {
    if (!id) return;

    try {
      const configResult = await serverAPI.getServerConfig(id);
      if (configResult?.success) {
        setServerConfig(configResult.data);
      }

      const infoResult = await serverAPI.getServerInfo(id);
      if (infoResult?.success) {
        setServerInfo(infoResult.data);
      }
    } catch (err) {
      console.error('Failed to fetch server data:', err);
    }
  };

  // On server select
  const handleServerSelect = (id) => {
    setServerId(id);
  };

  useEffect(() => {
    getServers();
  }, []);

  useEffect(() => {
    if (serverId) {
      fetchServerData(serverId);
    }
  }, [serverId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Sunucu Durum Paneli</CardTitle>
          <CardDescription>Bir sunucu seçin ve detayları görün</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Server Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sunucu Seç</label>
            <Select value={serverId} onValueChange={handleServerSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Sunucu seçin" />
              </SelectTrigger>
              <SelectContent>
                {servers.map(server => (
                  <SelectItem key={server.id} value={server.id}>
                    {server.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Server Info */}
          {serverInfo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs">Üye Sayısı</CardDescription>
                  <CardTitle className="text-2xl">{serverInfo.members?.length || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs">Kanal Sayısı</CardDescription>
                  <CardTitle className="text-2xl">{serverInfo.channels?.length || 0}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardDescription className="text-xs">Rol Sayısı</CardDescription>
                  <CardTitle className="text-2xl">{serverInfo.roles?.length || 0}</CardTitle>
                </CardHeader>
              </Card>
            </div>
          )}

          {/* Server Config Status */}
          {serverConfig && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Guard Durumları</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(serverConfig).filter(([key]) => key.endsWith('Guard')).map(([key, value]) => (
                  <div key={key} className={`p-3 rounded-md border ${value ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-sm font-medium">{key.replace('Guard', '')} Guard</p>
                    <p className={`text-xs ${value ? 'text-green-600' : 'text-gray-500'}`}>{value ? 'Açık' : 'Kapalı'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default StatusPanel;

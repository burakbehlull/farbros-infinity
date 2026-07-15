import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ui';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Farbros Infinity v2</CardTitle>
          <CardDescription className="text-lg">Discord sunucu koruma botu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Botunuzun sunucunuzu koruması için ayarları yapılandırın.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button onClick={() => navigate('/status')}>
              Durum Paneline Git
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;

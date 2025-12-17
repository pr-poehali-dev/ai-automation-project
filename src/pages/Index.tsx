import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Обработка заявок клиентов', status: 'active', success: 98, executions: 1247, lastRun: '2 минуты назад' },
    { id: 2, name: 'Синхронизация данных CRM', status: 'active', success: 95, executions: 856, lastRun: '15 минут назад' },
    { id: 3, name: 'Генерация отчетов', status: 'paused', success: 100, executions: 342, lastRun: '2 часа назад' },
    { id: 4, name: 'Модерация контента', status: 'active', success: 92, executions: 2103, lastRun: '1 минуту назад' },
  ]);

  const [history, setHistory] = useState([
    { id: 1, scenario: 'Обработка заявок клиентов', time: '14:32:15', status: 'success', duration: '2.3s' },
    { id: 2, scenario: 'Модерация контента', time: '14:31:48', status: 'success', duration: '1.8s' },
    { id: 3, scenario: 'Синхронизация данных CRM', time: '14:25:12', status: 'success', duration: '5.1s' },
    { id: 4, scenario: 'Обработка заявок клиентов', time: '14:23:07', status: 'success', duration: '2.1s' },
    { id: 5, scenario: 'Модерация контента', time: '14:22:33', status: 'error', duration: '0.5s' },
    { id: 6, scenario: 'Синхронизация данных CRM', time: '14:18:45', status: 'success', duration: '4.9s' },
  ]);

  const toggleScenario = (id: number) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s
    ));
  };

  const totalExecutions = scenarios.reduce((sum, s) => sum + s.executions, 0);
  const avgSuccess = Math.round(scenarios.reduce((sum, s) => sum + s.success, 0) / scenarios.length);
  const activeScenarios = scenarios.filter(s => s.status === 'active').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Automation Platform</h1>
                <p className="text-sm text-muted-foreground">Корпоративная система автоматизации</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Новый сценарий
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Активные сценарии</CardDescription>
                <Icon name="Activity" size={20} className="text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{activeScenarios}/{scenarios.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Запущено в данный момент</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Всего выполнений</CardDescription>
                <Icon name="BarChart3" size={20} className="text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalExecutions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">За последние 24 часа</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>Успешность</CardDescription>
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{avgSuccess}%</div>
              <p className="text-xs text-muted-foreground mt-1">Средний показатель</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="scenarios" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="scenarios">Сценарии автоматизации</TabsTrigger>
            <TabsTrigger value="history">История выполнения</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Управление сценариями</CardTitle>
                <CardDescription>Активные процессы автоматизации с ИИ-интеграцией</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-foreground">{scenario.name}</h3>
                          <Badge variant={scenario.status === 'active' ? 'default' : 'secondary'}>
                            {scenario.status === 'active' ? 'Активен' : 'Приостановлен'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Play" size={14} />
                            {scenario.executions} выполнений
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {scenario.lastRun}
                          </span>
                        </div>
                      </div>
                      <Switch
                        checked={scenario.status === 'active'}
                        onCheckedChange={() => toggleScenario(scenario.id)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Успешность</span>
                        <span className="font-medium text-foreground">{scenario.success}%</span>
                      </div>
                      <Progress value={scenario.success} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>История выполнения</CardTitle>
                <CardDescription>Мониторинг процессов в реальном времени</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{item.scenario}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{item.duration}</span>
                        <Badge variant={item.status === 'success' ? 'default' : 'destructive'} className="min-w-[80px] justify-center">
                          {item.status === 'success' ? 'Успешно' : 'Ошибка'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>ИИ-Ассистент интеграций</CardTitle>
            <CardDescription>Умная интеграция с внешними системами через AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Database" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">CRM системы</h4>
                    <p className="text-xs text-muted-foreground">3 подключения</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Salesforce, HubSpot, Bitrix24</p>
              </div>

              <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Email сервисы</h4>
                    <p className="text-xs text-muted-foreground">2 подключения</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Gmail API, SendGrid</p>
              </div>

              <div className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Cloud" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Облачные API</h4>
                    <p className="text-xs text-muted-foreground">5 подключений</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">AWS, Azure, Google Cloud</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
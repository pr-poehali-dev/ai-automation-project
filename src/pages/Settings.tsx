import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: 'Алексей Иванов', email: 'a.ivanov@company.com', role: 'admin', status: 'active', lastActive: '5 минут назад' },
    { id: 2, name: 'Мария Петрова', email: 'm.petrova@company.com', role: 'manager', status: 'active', lastActive: '1 час назад' },
    { id: 3, name: 'Дмитрий Сидоров', email: 'd.sidorov@company.com', role: 'user', status: 'active', lastActive: '3 часа назад' },
    { id: 4, name: 'Ольга Козлова', email: 'o.kozlova@company.com', role: 'user', status: 'inactive', lastActive: '2 дня назад' },
  ]);

  const [permissions, setPermissions] = useState({
    admin: {
      scenarios: { create: true, edit: true, delete: true, view: true },
      users: { create: true, edit: true, delete: true, view: true },
      settings: { edit: true, view: true },
      integrations: { create: true, edit: true, delete: true, view: true },
    },
    manager: {
      scenarios: { create: true, edit: true, delete: false, view: true },
      users: { create: false, edit: false, delete: false, view: true },
      settings: { edit: false, view: true },
      integrations: { create: true, edit: true, delete: false, view: true },
    },
    user: {
      scenarios: { create: false, edit: false, delete: false, view: true },
      users: { create: false, edit: false, delete: false, view: false },
      settings: { edit: false, view: true },
      integrations: { create: false, edit: false, delete: false, view: true },
    },
  });

  const [currentUser, setCurrentUser] = useState({
    name: 'Алексей Иванов',
    email: 'a.ivanov@company.com',
    role: 'admin',
    notifications: {
      email: true,
      browser: true,
      errors: true,
      success: false,
    },
  });

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'default',
      manager: 'secondary',
      user: 'outline',
    };
    const labels = {
      admin: 'Администратор',
      manager: 'Менеджер',
      user: 'Пользователь',
    };
    return { variant: variants[role as keyof typeof variants], label: labels[role as keyof typeof labels] };
  };

  const togglePermission = (role: string, category: string, permission: string) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role as keyof typeof prev],
        [category]: {
          ...prev[role as keyof typeof prev][category as keyof typeof prev.admin],
          [permission]: !prev[role as keyof typeof prev][category as keyof typeof prev.admin][permission as keyof typeof prev.admin.scenarios],
        },
      },
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Настройки системы</h1>
                <p className="text-sm text-muted-foreground">Управление профилями и правами доступа</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="permissions">Права доступа</TabsTrigger>
            <TabsTrigger value="profile">Мой профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Управление пользователями</CardTitle>
                    <CardDescription>Список всех пользователей системы</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Добавить пользователя
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Новый пользователь</DialogTitle>
                        <DialogDescription>Добавьте нового пользователя в систему</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input id="name" placeholder="Введите имя" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="email@company.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Роль</Label>
                          <Select defaultValue="user">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Администратор</SelectItem>
                              <SelectItem value="manager">Менеджер</SelectItem>
                              <SelectItem value="user">Пользователь</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Отмена</Button>
                        <Button>Добавить</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => {
                    const roleBadge = getRoleBadge(user.role);
                    return (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-medium text-foreground">{user.name}</h3>
                              <Badge variant={roleBadge.variant as any}>{roleBadge.label}</Badge>
                              {user.status === 'inactive' && (
                                <Badge variant="outline">Неактивен</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="Mail" size={14} />
                                {user.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Icon name="Clock" size={14} />
                                {user.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Матрица прав доступа</CardTitle>
                <CardDescription>Настройка прав для каждой роли</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {Object.entries(permissions).map(([role, perms]) => {
                    const roleBadge = getRoleBadge(role);
                    return (
                      <div key={role} className="space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-border">
                          <Badge variant={roleBadge.variant as any}>{roleBadge.label}</Badge>
                          <span className="text-sm text-muted-foreground">Права доступа для роли</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(perms).map(([category, categoryPerms]) => (
                            <Card key={category}>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm flex items-center gap-2">
                                  <Icon 
                                    name={category === 'scenarios' ? 'Zap' : category === 'users' ? 'Users' : category === 'settings' ? 'Settings' : 'Cloud'} 
                                    size={16} 
                                    className="text-primary"
                                  />
                                  {category === 'scenarios' ? 'Сценарии' : category === 'users' ? 'Пользователи' : category === 'settings' ? 'Настройки' : 'Интеграции'}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {Object.entries(categoryPerms).map(([perm, enabled]) => (
                                  <div key={perm} className="flex items-center justify-between">
                                    <Label htmlFor={`${role}-${category}-${perm}`} className="text-sm cursor-pointer">
                                      {perm === 'create' ? 'Создание' : perm === 'edit' ? 'Редактирование' : perm === 'delete' ? 'Удаление' : 'Просмотр'}
                                    </Label>
                                    <Switch
                                      id={`${role}-${category}-${perm}`}
                                      checked={enabled}
                                      onCheckedChange={() => togglePermission(role, category, perm)}
                                    />
                                  </div>
                                ))}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Профиль</CardTitle>
                  <CardDescription>Основная информация</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить фото
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Имя</Label>
                      <Input value={currentUser.name} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" value={currentUser.email} />
                    </div>
                    <div className="space-y-2">
                      <Label>Роль</Label>
                      <div className="flex items-center gap-2">
                        <Badge>{getRoleBadge(currentUser.role).label}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Уведомления</CardTitle>
                  <CardDescription>Настройте способы получения уведомлений</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={18} className="text-primary" />
                          <Label className="font-medium">Email уведомления</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
                      </div>
                      <Switch
                        checked={currentUser.notifications.email}
                        onCheckedChange={(checked) => 
                          setCurrentUser(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, email: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon name="Bell" size={18} className="text-primary" />
                          <Label className="font-medium">Браузерные уведомления</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Push-уведомления в браузере</p>
                      </div>
                      <Switch
                        checked={currentUser.notifications.browser}
                        onCheckedChange={(checked) => 
                          setCurrentUser(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, browser: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon name="AlertCircle" size={18} className="text-destructive" />
                          <Label className="font-medium">Уведомления об ошибках</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Получать алерты при сбоях</p>
                      </div>
                      <Switch
                        checked={currentUser.notifications.errors}
                        onCheckedChange={(checked) => 
                          setCurrentUser(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, errors: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Icon name="CheckCircle" size={18} className="text-green-500" />
                          <Label className="font-medium">Успешные выполнения</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Уведомлять о каждом успешном выполнении</p>
                      </div>
                      <Switch
                        checked={currentUser.notifications.success}
                        onCheckedChange={(checked) => 
                          setCurrentUser(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, success: checked }
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button className="w-full">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить изменения
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

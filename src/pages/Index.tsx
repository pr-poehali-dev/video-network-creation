import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadedAt: string;
  duration: string;
  thumbnail: string;
}

interface Playlist {
  id: string;
  name: string;
  videosCount: number;
  thumbnail: string;
}

export default function Index() {
  const [currentSection, setCurrentSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: '1', name: 'Избранное', videosCount: 12, thumbnail: '🎬' },
    { id: '2', name: 'Смотреть позже', videosCount: 8, thumbnail: '⏰' }
  ]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const trendingVideos: Video[] = [
    { id: '1', title: 'Космические путешествия: будущее уже близко', channel: 'Space Explorer', views: '2.3M', uploadedAt: '2 дня назад', duration: '12:34', thumbnail: '🚀' },
    { id: '2', title: 'Кулинарный мастер-класс: идеальная паста', channel: 'Chef Masters', views: '1.8M', uploadedAt: '1 день назад', duration: '15:22', thumbnail: '🍝' },
    { id: '3', title: 'Технологии 2025: что нас ждет', channel: 'Tech Vision', views: '3.1M', uploadedAt: '3 дня назад', duration: '18:45', thumbnail: '💻' },
    { id: '4', title: 'Путешествие по Исландии', channel: 'Travel World', views: '980K', uploadedAt: '5 дней назад', duration: '22:11', thumbnail: '🏔️' },
    { id: '5', title: 'Музыкальный фестиваль: лучшие моменты', channel: 'Music Live', views: '2.7M', uploadedAt: '1 неделю назад', duration: '25:33', thumbnail: '🎵' },
    { id: '6', title: 'Как создать идеальный дизайн', channel: 'Design Pro', views: '1.2M', uploadedAt: '4 дня назад', duration: '14:08', thumbnail: '🎨' }
  ];

  const subscriptionVideos: Video[] = [
    { id: '7', title: 'Новый выпуск подкаста о технологиях', channel: 'Tech Talks', views: '450K', uploadedAt: '1 час назад', duration: '45:20', thumbnail: '🎙️' },
    { id: '8', title: 'Утренняя йога для начинающих', channel: 'Yoga Flow', views: '320K', uploadedAt: '2 часа назад', duration: '30:15', thumbnail: '🧘' }
  ];

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName,
        videosCount: 0,
        thumbnail: '📁'
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setIsDialogOpen(false);
    }
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  const renderVideos = (videos: Video[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map(video => (
        <Card key={video.id} className="group cursor-pointer hover-scale overflow-hidden bg-card border-border">
          <div className="relative aspect-video bg-secondary flex items-center justify-center text-6xl">
            {video.thumbnail}
            <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
              {video.duration}
            </Badge>
          </div>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {video.channel[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground">{video.channel}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{video.views} просмотров</span>
                  <span>•</span>
                  <span>{video.uploadedAt}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderPlaylists = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Мои плейлисты</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Plus" size={20} className="mr-2" />
              Создать плейлист
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Новый плейлист</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Название плейлиста"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="bg-secondary border-border text-foreground"
                onKeyDown={(e) => e.key === 'Enter' && createPlaylist()}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={createPlaylist} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Создать
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map(playlist => (
          <Card key={playlist.id} className="group cursor-pointer hover-scale overflow-hidden bg-card border-border">
            <div className="relative aspect-video bg-secondary flex items-center justify-center text-6xl">
              {playlist.thumbnail}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {playlist.videosCount} видео
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlaylist(playlist.id);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Пользователь</h2>
              <p className="text-muted-foreground mb-4">user@example.com</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">{playlists.length}</p>
                  <p className="text-sm text-muted-foreground">Плейлистов</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">24</p>
                  <p className="text-sm text-muted-foreground">Подписок</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">Просмотров</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="text-3xl">📹</div>
              <h1 className="text-xl font-bold text-foreground">VideoHub</h1>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary border-border text-foreground pl-10"
                />
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Icon name="Bell" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 min-h-screen bg-card border-r border-border p-4 sticky top-16 hidden lg:block">
          <nav className="space-y-2">
            <Button
              variant={currentSection === 'home' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${currentSection === 'home' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
              onClick={() => setCurrentSection('home')}
            >
              <Icon name="Home" size={20} className="mr-3" />
              Главная
            </Button>
            <Button
              variant={currentSection === 'trending' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${currentSection === 'trending' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
              onClick={() => setCurrentSection('trending')}
            >
              <Icon name="TrendingUp" size={20} className="mr-3" />
              Трендовое
            </Button>
            <Button
              variant={currentSection === 'subscriptions' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${currentSection === 'subscriptions' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
              onClick={() => setCurrentSection('subscriptions')}
            >
              <Icon name="Users" size={20} className="mr-3" />
              Подписки
            </Button>
            <Button
              variant={currentSection === 'playlists' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${currentSection === 'playlists' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
              onClick={() => setCurrentSection('playlists')}
            >
              <Icon name="ListVideo" size={20} className="mr-3" />
              Плейлисты
            </Button>
            <Button
              variant={currentSection === 'favorites' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${currentSection === 'favorites' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
              onClick={() => setCurrentSection('favorites')}
            >
              <Icon name="Heart" size={20} className="mr-3" />
              Избранное
            </Button>
            <Button
              variant={currentSection === 'profile' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${currentSection === 'profile' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
              onClick={() => setCurrentSection('profile')}
            >
              <Icon name="User" size={20} className="mr-3" />
              Профиль
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {currentSection === 'home' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Рекомендации</h2>
                  {renderVideos(trendingVideos)}
                </div>
              </div>
            )}

            {currentSection === 'trending' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Трендовое</h2>
                {renderVideos(trendingVideos)}
              </div>
            )}

            {currentSection === 'subscriptions' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Подписки</h2>
                {renderVideos(subscriptionVideos)}
              </div>
            )}

            {currentSection === 'playlists' && renderPlaylists()}

            {currentSection === 'favorites' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Избранное</h2>
                {renderVideos(trendingVideos.slice(0, 3))}
              </div>
            )}

            {currentSection === 'profile' && renderProfile()}
          </div>
        </main>
      </div>
    </div>
  );
}

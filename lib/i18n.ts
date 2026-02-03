export type Language = 'en' | 'de' | 'ru'

export interface Translations {
  [key: string]: {
    [lang in Language]: string
  }
}

export const translations: Translations = {
  // App
  appName: {
    en: 'Vieditor',
    de: 'Vieditor',
    ru: 'Vieditor'
  },
  tagline: {
    en: 'Professional Media Editor',
    de: 'Professioneller Medien-Editor',
    ru: 'Профессиональный Медиа-Редактор'
  },

  // Navigation
  home: {
    en: 'Home',
    de: 'Start',
    ru: 'Главная'
  },
  create: {
    en: 'Create',
    de: 'Erstellen',
    ru: 'Создать'
  },
  templates: {
    en: 'Templates',
    de: 'Vorlagen',
    ru: 'Шаблоны'
  },
  projects: {
    en: 'Projects',
    de: 'Projekte',
    ru: 'Проекты'
  },
  profile: {
    en: 'Profile',
    de: 'Profil',
    ru: 'Профиль'
  },

  // Auth
  signIn: {
    en: 'Sign In',
    de: 'Anmelden',
    ru: 'Войти'
  },
  signOut: {
    en: 'Sign Out',
    de: 'Abmelden',
    ru: 'Выйти'
  },
  email: {
    en: 'Email',
    de: 'E-Mail',
    ru: 'Email'
  },
  password: {
    en: 'Password',
    de: 'Passwort',
    ru: 'Пароль'
  },

  // Onboarding
  welcome: {
    en: 'Welcome to Vieditor',
    de: 'Willkommen bei Vieditor',
    ru: 'Добро пожаловать в Vieditor'
  },
  chooseLanguage: {
    en: 'Choose your language',
    de: 'Wählen Sie Ihre Sprache',
    ru: 'Выберите язык'
  },
  english: {
    en: 'English',
    de: 'Englisch',
    ru: 'Английский'
  },
  german: {
    en: 'German',
    de: 'Deutsch',
    ru: 'Немецкий'
  },
  russian: {
    en: 'Russian',
    de: 'Russisch',
    ru: 'Русский'
  },
  continue: {
    en: 'Continue',
    de: 'Weiter',
    ru: 'Продолжить'
  },

  // Create
  chooseContentType: {
    en: 'Choose Content Type',
    de: 'Inhaltstyp wählen',
    ru: 'Выберите тип контента'
  },
  videoEditor: {
    en: 'Video Editor',
    de: 'Video-Editor',
    ru: 'Видео-редактор'
  },
  photoEditor: {
    en: 'Photo Editor',
    de: 'Foto-Editor',
    ru: 'Фото-редактор'
  },
  editVideosWithTools: {
    en: 'Edit videos with advanced tools',
    de: 'Bearbeiten Sie Videos mit fortschrittlichen Tools',
    ru: 'Редактируйте видео с продвинутыми инструментами'
  },
  enhancePhotosWithFilters: {
    en: 'Enhance photos with filters',
    de: 'Verbessern Sie Fotos mit Filtern',
    ru: 'Улучшайте фото с фильтрами'
  },

  // Admin
  adminDashboard: {
    en: 'Admin Dashboard',
    de: 'Admin-Dashboard',
    ru: 'Панель администратора'
  },
  users: {
    en: 'Users',
    de: 'Benutzer',
    ru: 'Пользователи'
  },
  totalUsers: {
    en: 'Total Users',
    de: 'Gesamtbenutzer',
    ru: 'Всего пользователей'
  },
  activeUsers: {
    en: 'Active Users (30d)',
    de: 'Aktive Benutzer (30d)',
    ru: 'Активные пользователи (30д)'
  },
  totalProjects: {
    en: 'Total Projects',
    de: 'Gesamtprojekte',
    ru: 'Всего проектов'
  },
  changePassword: {
    en: 'Change Password',
    de: 'Passwort ändern',
    ru: 'Изменить пароль'
  },
  currentPassword: {
    en: 'Current Password',
    de: 'Aktuelles Passwort',
    ru: 'Текущий пароль'
  },
  newPassword: {
    en: 'New Password',
    de: 'Neues Passwort',
    ru: 'Новый пароль'
  },
  confirmPassword: {
    en: 'Confirm Password',
    de: 'Passwort bestätigen',
    ru: 'Подтвердите пароль'
  },
  updatePassword: {
    en: 'Update Password',
    de: 'Passwort aktualisieren',
    ru: 'Обновить пароль'
  },
  userManagement: {
    en: 'User Management',
    de: 'Benutzerverwaltung',
    ru: 'Управление пользователями'
  },
  addUser: {
    en: 'Add User',
    de: 'Benutzer hinzufügen',
    ru: 'Добавить пользователя'
  },
  deleteUser: {
    en: 'Delete User',
    de: 'Benutzer löschen',
    ru: 'Удалить пользователя'
  }
}

export function getTranslation(key: string, language: Language): string {
  return translations[key]?.[language] || translations[key]?.en || key
}
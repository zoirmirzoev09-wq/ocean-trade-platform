import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ru' | 'tj' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.products': 'Продукция',
    'nav.categories': 'Категории',
    'nav.contacts': 'Контакты',
    'nav.cart': 'Корзина',
    'nav.account': 'Кабинет',
    'nav.login': 'Войти',
    'nav.register': 'Регистрация',
    'nav.logout': 'Выйти',
    'nav.admin': 'Админ панель',
    
    // Hero
    'hero.title': 'Строительные и отделочные материалы',
    'hero.subtitle': 'Качественные материалы для вашего дома и бизнеса',
    'hero.cta': 'Смотреть каталог',
    'hero.contact': 'Связаться с нами',
    
    // Categories
    'categories.title': 'Наши категории',
    'categories.subtitle': 'Широкий ассортимент строительных материалов',
    'categories.water_emulsion': 'Водоэмульсии',
    'categories.decorative_plaster': 'Декоративные штукатурки',
    'categories.atlas': 'Атлас',
    'categories.bilivet': 'Биливет',
    'categories.beton_contact': 'Бетон контакт',
    'categories.primer': 'Грунтовка',
    'categories.putty': 'Шпатлёвка',
    'categories.tile_adhesive': 'Клей для кафеля',
    'categories.rodband': 'Ротбанд',
    'categories.sand': 'Пески',
    'categories.acrylic_glue': 'Акриловый клей',
    'categories.other': 'Другие материалы',
    'categories.view_all': 'Смотреть все',
    
    // Advantages
    'advantages.title': 'Почему выбирают нас',
    'advantages.quality': 'Высокое качество',
    'advantages.quality_desc': 'Только сертифицированные материалы от проверенных производителей',
    'advantages.price': 'Лучшие цены',
    'advantages.price_desc': 'Конкурентные цены благодаря прямым поставкам',
    'advantages.delivery': 'Быстрая доставка',
    'advantages.delivery_desc': 'Оперативная доставка по всему Таджикистану',
    'advantages.support': 'Консультации',
    'advantages.support_desc': 'Профессиональная помощь в выборе материалов',
    
    // Products
    'products.title': 'Новинки',
    'products.subtitle': 'Последние поступления в наш каталог',
    'products.add_to_cart': 'В корзину',
    'products.view_details': 'Подробнее',
    'products.in_stock': 'В наличии',
    'products.out_of_stock': 'Нет в наличии',
    'products.price': 'Цена',
    'products.sort_by': 'Сортировка',
    'products.sort_price_asc': 'Цена: по возрастанию',
    'products.sort_price_desc': 'Цена: по убыванию',
    'products.sort_name': 'По названию',
    'products.filter': 'Фильтр',
    'products.search': 'Поиск продуктов...',
    
    // About
    'about.title': 'О компании',
    'about.subtitle': 'Ваш надёжный партнёр в строительстве',
    'about.mission': 'Наша миссия',
    'about.mission_text': 'Обеспечивать клиентов качественными строительными материалами по доступным ценам, способствуя развитию строительной отрасли Таджикистана.',
    'about.vision': 'Наше видение',
    'about.vision_text': 'Стать ведущим поставщиком строительных материалов в регионе, известным своим качеством, надёжностью и клиентоориентированным подходом.',
    'about.experience': 'Опыт и надёжность',
    'about.experience_text': 'Компания Океан успешно работает на рынке строительных материалов, предоставляя продукцию высочайшего качества.',
    
    // Contacts
    'contacts.title': 'Контакты',
    'contacts.subtitle': 'Свяжитесь с нами',
    'contacts.phone': 'Телефон',
    'contacts.email': 'Электронная почта',
    'contacts.address': 'Адрес',
    'contacts.hours': 'Режим работы',
    'contacts.form_title': 'Напишите нам',
    'contacts.form_name': 'Ваше имя',
    'contacts.form_email': 'Email',
    'contacts.form_message': 'Сообщение',
    'contacts.form_send': 'Отправить',
    
    // Footer
    'footer.rights': 'Все права защищены',
    'footer.company': 'Ҷ.Д.Д.М Океан',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успешно',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.add': 'Добавить',
    'common.search': 'Поиск',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.currency': 'сомони',
  },
  tj: {
    // Navigation
    'nav.home': 'Асосӣ',
    'nav.about': 'Дар бораи мо',
    'nav.products': 'Маҳсулот',
    'nav.categories': 'Категорияҳо',
    'nav.contacts': 'Тамос',
    'nav.cart': 'Сабад',
    'nav.account': 'Кабинет',
    'nav.login': 'Даромадан',
    'nav.register': 'Бақайдгирӣ',
    'nav.logout': 'Баромадан',
    'nav.admin': 'Панели админ',
    
    // Hero
    'hero.title': 'Масолеҳи сохтмонӣ ва пардозӣ',
    'hero.subtitle': 'Масолеҳи сифатнок барои хона ва бизнеси шумо',
    'hero.cta': 'Каталогро дидан',
    'hero.contact': 'Бо мо тамос гиред',
    
    // Categories
    'categories.title': 'Категорияҳои мо',
    'categories.subtitle': 'Ассортименти васеъи масолеҳи сохтмонӣ',
    'categories.water_emulsion': 'Эмулсияҳои обӣ',
    'categories.decorative_plaster': 'Андоваҳои ороишӣ',
    'categories.atlas': 'Атлас',
    'categories.bilivet': 'Биливет',
    'categories.beton_contact': 'Бетон контакт',
    'categories.primer': 'Грунтовка',
    'categories.putty': 'Шпаклёвка',
    'categories.tile_adhesive': 'Часби кафел',
    'categories.rodband': 'Ротбанд',
    'categories.sand': 'Регҳо',
    'categories.acrylic_glue': 'Часби акрилӣ',
    'categories.other': 'Масолеҳи дигар',
    'categories.view_all': 'Ҳамаро дидан',
    
    // Advantages
    'advantages.title': 'Чаро моро интихоб мекунанд',
    'advantages.quality': 'Сифати баланд',
    'advantages.quality_desc': 'Танҳо масолеҳи сертификатсияшуда аз истеҳсолкунандагони боэътимод',
    'advantages.price': 'Нархҳои беҳтарин',
    'advantages.price_desc': 'Нархҳои рақобатпазир бо воридоти бевосита',
    'advantages.delivery': 'Интиқоли зуд',
    'advantages.delivery_desc': 'Интиқоли фаврӣ дар тамоми Тоҷикистон',
    'advantages.support': 'Маслиҳатҳо',
    'advantages.support_desc': 'Кӯмаки касбӣ дар интихоби масолеҳ',
    
    // Products
    'products.title': 'Навгониҳо',
    'products.subtitle': 'Воридоти охирин ба каталоги мо',
    'products.add_to_cart': 'Ба сабад',
    'products.view_details': 'Муфассал',
    'products.in_stock': 'Дар анбор',
    'products.out_of_stock': 'Дар анбор нест',
    'products.price': 'Нарх',
    'products.sort_by': 'Мураттабсозӣ',
    'products.sort_price_asc': 'Нарх: афзоиш',
    'products.sort_price_desc': 'Нарх: коҳиш',
    'products.sort_name': 'Аз рӯи ном',
    'products.filter': 'Филтр',
    'products.search': 'Ҷустуҷӯи маҳсулот...',
    
    // About
    'about.title': 'Дар бораи ширкат',
    'about.subtitle': 'Шарики боэътимоди шумо дар сохтмон',
    'about.mission': 'Миссияи мо',
    'about.mission_text': 'Таъмин кардани муштариён бо масолеҳи сохтмонии сифатнок бо нархҳои дастрас, мусоидат ба рушди соҳаи сохтмони Тоҷикистон.',
    'about.vision': 'Чашмандози мо',
    'about.vision_text': 'Гаштан ба таъминкунандаи пешрафта дар минтақа, ки бо сифат, боэътимодӣ ва хизматрасонии мизоҷӣ маъруф аст.',
    'about.experience': 'Таҷриба ва боэътимодӣ',
    'about.experience_text': 'Ширкати Океан бомуваффақият дар бозори масолеҳи сохтмонӣ кор мекунад, маҳсулоти сифатнок пешниҳод мекунад.',
    
    // Contacts
    'contacts.title': 'Тамос',
    'contacts.subtitle': 'Бо мо тамос гиред',
    'contacts.phone': 'Телефон',
    'contacts.email': 'Почтаи электронӣ',
    'contacts.address': 'Суроға',
    'contacts.hours': 'Соатҳои корӣ',
    'contacts.form_title': 'Ба мо нависед',
    'contacts.form_name': 'Номи шумо',
    'contacts.form_email': 'Email',
    'contacts.form_message': 'Паём',
    'contacts.form_send': 'Фиристодан',
    
    // Footer
    'footer.rights': 'Ҳамаи ҳуқуқҳо ҳифз шудаанд',
    'footer.company': 'Ҷ.Д.Д.М Океан',
    
    // Common
    'common.loading': 'Боркунӣ...',
    'common.error': 'Хато',
    'common.success': 'Муваффақ',
    'common.save': 'Нигоҳ доштан',
    'common.cancel': 'Бекор кардан',
    'common.delete': 'Нест кардан',
    'common.edit': 'Таҳрир',
    'common.add': 'Илова кардан',
    'common.search': 'Ҷустуҷӯ',
    'common.back': 'Бозгашт',
    'common.next': 'Навбатӣ',
    'common.currency': 'сомонӣ',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.categories': 'Categories',
    'nav.contacts': 'Contacts',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.admin': 'Admin Panel',
    
    // Hero
    'hero.title': 'Construction & Finishing Materials',
    'hero.subtitle': 'Quality materials for your home and business',
    'hero.cta': 'View Catalog',
    'hero.contact': 'Contact Us',
    
    // Categories
    'categories.title': 'Our Categories',
    'categories.subtitle': 'Wide range of construction materials',
    'categories.water_emulsion': 'Water Emulsions',
    'categories.decorative_plaster': 'Decorative Plasters',
    'categories.atlas': 'Atlas',
    'categories.bilivet': 'Bilivet',
    'categories.beton_contact': 'Beton Contact',
    'categories.primer': 'Primers',
    'categories.putty': 'Putty',
    'categories.tile_adhesive': 'Tile Adhesive',
    'categories.rodband': 'Rodband',
    'categories.sand': 'Sands',
    'categories.acrylic_glue': 'Acrylic Glue',
    'categories.other': 'Other Materials',
    'categories.view_all': 'View All',
    
    // Advantages
    'advantages.title': 'Why Choose Us',
    'advantages.quality': 'High Quality',
    'advantages.quality_desc': 'Only certified materials from trusted manufacturers',
    'advantages.price': 'Best Prices',
    'advantages.price_desc': 'Competitive prices through direct supply chains',
    'advantages.delivery': 'Fast Delivery',
    'advantages.delivery_desc': 'Prompt delivery across all of Tajikistan',
    'advantages.support': 'Expert Advice',
    'advantages.support_desc': 'Professional assistance in material selection',
    
    // Products
    'products.title': 'New Arrivals',
    'products.subtitle': 'Latest additions to our catalog',
    'products.add_to_cart': 'Add to Cart',
    'products.view_details': 'View Details',
    'products.in_stock': 'In Stock',
    'products.out_of_stock': 'Out of Stock',
    'products.price': 'Price',
    'products.sort_by': 'Sort By',
    'products.sort_price_asc': 'Price: Low to High',
    'products.sort_price_desc': 'Price: High to Low',
    'products.sort_name': 'By Name',
    'products.filter': 'Filter',
    'products.search': 'Search products...',
    
    // About
    'about.title': 'About Company',
    'about.subtitle': 'Your reliable partner in construction',
    'about.mission': 'Our Mission',
    'about.mission_text': 'To provide customers with quality construction materials at affordable prices, contributing to the development of Tajikistan\'s construction industry.',
    'about.vision': 'Our Vision',
    'about.vision_text': 'To become the leading supplier of construction materials in the region, known for quality, reliability, and customer-oriented approach.',
    'about.experience': 'Experience & Reliability',
    'about.experience_text': 'Ocean company successfully operates in the construction materials market, providing products of the highest quality.',
    
    // Contacts
    'contacts.title': 'Contacts',
    'contacts.subtitle': 'Get in touch with us',
    'contacts.phone': 'Phone',
    'contacts.email': 'Email',
    'contacts.address': 'Address',
    'contacts.hours': 'Working Hours',
    'contacts.form_title': 'Write to Us',
    'contacts.form_name': 'Your Name',
    'contacts.form_email': 'Email',
    'contacts.form_message': 'Message',
    'contacts.form_send': 'Send',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.company': 'Ocean LLC',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.currency': 'somoni',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

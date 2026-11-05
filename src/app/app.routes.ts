import { Routes } from '@angular/router';
import { HomePage } from './home-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'BRAAM Family | A Fire Fellowship' },
  { path: 'about', loadComponent: () => import('./pages/about-page').then(m => m.AboutPage), title: 'About Us | BRAAM Family' },
  { path: 'vision', loadComponent: () => import('./pages/vision-page').then(m => m.VisionPage), title: 'Vision & Mission | BRAAM Family' },
  { path: 'organigram', loadComponent: () => import('./pages/organigram-page').then(m => m.OrganigramPage), title: 'Organigram | BRAAM Family' },
  { path: 'schedule', loadComponent: () => import('./pages/schedule-page').then(m => m.SchedulePage), title: 'Schedule | BRAAM Family' },
  { path: 'preachings', loadComponent: () => import('./pages/preachings-page').then(m => m.PreachingsPage), title: 'Preachings | BRAAM Family' },
  { path: 'workers', loadComponent: () => import('./pages/workers-page').then(m => m.WorkersPage), title: 'Workers Teachings | BRAAM Family' },
  { path: 'blog', loadComponent: () => import('./pages/blog-page').then(m => m.BlogPage), title: 'Teachings & Reflections | BRAAM Family' },
  { path: 'testimonies', loadComponent: () => import('./pages/testimonies-page').then(m => m.TestimoniesPage), title: 'Testimonies | BRAAM Family' },
  { path: 'shop', loadComponent: () => import('./pages/shop-page').then(m => m.ShopPage), title: 'Shop | BRAAM Family' },
  { path: 'donate', loadComponent: () => import('./pages/donate-page').then(m => m.DonatePage), title: 'Give & Partner | BRAAM Family' },
  { path: 'contact', loadComponent: () => import('./pages/contact-page').then(m => m.ContactPage), title: 'Contact Us | BRAAM Family' },
  { path: 'connect', loadComponent: () => import('./pages/connect-page').then(m => m.ConnectPage), title: 'Connect | BRAAM Family' },
  { path: 'join', loadComponent: () => import('./pages/join-page').then(m => m.JoinPage), title: 'Join the Family | BRAAM Family' },
  { path: 'returns', loadComponent: () => import('./pages/returns-page').then(m => m.ReturnsPage), title: 'Return Policy | BRAAM Family' },
  { path: 'privacy', loadComponent: () => import('./pages/privacy-page').then(m => m.PrivacyPage), title: 'Privacy Policy | BRAAM Family' },
  { path: '**', redirectTo: '' }
];

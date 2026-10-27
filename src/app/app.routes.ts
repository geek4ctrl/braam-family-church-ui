import { Routes } from '@angular/router';
import { HomePage } from './home-page';
import { ScreenPage } from './screen-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'BRAAM Family | A Fire Fellowship' },
  { path: 'about', component: ScreenPage, data: { page: 'about' }, title: 'About Us | BRAAM Family' },
  { path: 'vision', component: ScreenPage, data: { page: 'vision' }, title: 'Vision & Mission | BRAAM Family' },
  { path: 'organigram', component: ScreenPage, data: { page: 'organigram' }, title: 'Organigram | BRAAM Family' },
  { path: 'schedule', component: ScreenPage, data: { page: 'schedule' }, title: 'Schedule | BRAAM Family' },
  { path: 'preachings', component: ScreenPage, data: { page: 'preachings' }, title: 'Preachings | BRAAM Family' },
  { path: 'workers', component: ScreenPage, data: { page: 'workers' }, title: 'Workers Teachings | BRAAM Family' },
  { path: 'blog', component: ScreenPage, data: { page: 'blog' }, title: 'Teachings & Reflections | BRAAM Family' },
  { path: 'testimonies', component: ScreenPage, data: { page: 'testimonies' }, title: 'Testimonies | BRAAM Family' },
  { path: 'shop', component: ScreenPage, data: { page: 'shop' }, title: 'Shop | BRAAM Family' },
  { path: 'donate', component: ScreenPage, data: { page: 'donate' }, title: 'Give & Partner | BRAAM Family' },
  { path: 'contact', component: ScreenPage, data: { page: 'contact' }, title: 'Contact Us | BRAAM Family' },
  { path: 'connect', component: ScreenPage, data: { page: 'connect' }, title: 'Connect | BRAAM Family' },
  { path: 'join', component: ScreenPage, data: { page: 'join' }, title: 'Join the Family | BRAAM Family' },
  { path: 'returns', component: ScreenPage, data: { page: 'returns' }, title: 'Return Policy | BRAAM Family' },
  { path: 'privacy', component: ScreenPage, data: { page: 'privacy' }, title: 'Privacy Policy | BRAAM Family' },
  { path: '**', redirectTo: '' }
];

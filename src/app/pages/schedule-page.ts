import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PreferencesService } from '../core/preferences.service';
import { SCHEDULE_EVENTS, type ScheduleEvent } from '../core/content.data';

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <main class="screen-page">
    <section class="page-intro-hero"><p class="eyebrow"><span></span> {{ isFrench ? 'PROGRAMME HEBDOMADAIRE' : 'WEEKLY PROGRAMME' }}</p><h1>{{ isFrench ? 'Enseignements et' : 'Teachings &amp;' }}<br><em>{{ isFrench ? 'Calendrier des cultes' : 'Services Calendar' }}</em></h1><p>{{ isFrench ? 'Consultez les r\u00e9unions hebdomadaires actuellement r\u00e9pertori\u00e9es par BRAAM Family. Veuillez consulter le site officiel ou contacter l\u2019\u00e9glise pour les modifications et d\u00e9tails compl\u00e9mentaires.' : 'View the weekly worship gatherings currently listed by BRAAM Family. Please check the official website or contact the church for changes and additional programme details.' }}</p></section>
    <section class="content-section schedule-section"><div class="schedule-tools"><div class="filter-row">
      @for (f of scheduleFilters; track f) {
        <button [class.active]="scheduleFilter === f" (click)="scheduleFilter = f">{{ frFilter(f) }}</button>
      }
    </div><div class="view-switch"><button [class.active]="scheduleView === 'Week'" (click)="scheduleView = 'Week'">\u25a6 {{ isFrench ? 'Semaine' : 'Week' }}</button><button [class.active]="scheduleView === 'List'" (click)="scheduleView = 'List'">\u2637 {{ isFrench ? 'Liste' : 'List' }}</button></div></div>
      @if (scheduleView === 'Week') {
        <div class="week-days">
          @for (d of weekDays; track d) {
            <button [class.selected]="selectedDay === d" [class.today]="isToday(d)" [attr.aria-pressed]="selectedDay === d" (click)="selectScheduleDay(d)"><small>{{ frDay(d).slice(0,3) }}</small><b>{{ dateForDay(d) }}</b><span [class.has-event]="countForDay(d) > 0">\u25cf</span><small>{{ countForDay(d) }}</small></button>
          }
        </div>
      }
      <h2 class="schedule-day-title">{{ scheduleView === 'Week' ? frDay(selectedDay) : (isFrench ? 'Cette semaine' : 'This Week') }} <small>{{ selectedDate | date: 'd MMM yyyy' }} · {{ filteredEvents.length }} {{ isFrench ? 'évènements' : 'events' }}</small></h2>
      @for (event of filteredEvents; track event.title) {
        <article class="schedule-event"><div class="event-time"><b>{{ event.time }}</b><small>{{ event.end }}</small></div><div class="event-body"><span class="event-category" [attr.data-kind]="event.kind">{{ isFrench ? (event.kindFr || event.kind) : event.kind }}</span><small>{{ event.frequency }}</small><h3>{{ isFrench ? (event.titleFr || event.title) : event.title }}</h3><p>{{ isFrench ? (event.descFr || event.desc) : event.desc }}</p><small>\u2316 {{ event.place }}</small></div><span class="event-arrow">\u203a</span></article>
      }
      <div class="legend-panel"><small>{{ isFrench ? 'L\u00c9GENDE' : 'LEGEND' }}</small><span>\u25cf {{ isFrench ? 'Culte' : 'Church Service' }}</span><span>\u25cf {{ isFrench ? 'Enseignement' : 'Teaching' }}</span><span>\u25cf {{ isFrench ? 'Prière' : 'Prayer' }}</span><span>\u25cf {{ isFrench ? 'Solidarit\u00e9' : 'Outreach' }}</span><span>\u25cf {{ isFrench ? 'Jeunesse' : 'Youth' }}</span></div>
      @if (!filteredEvents.length) {
        <p class="empty-state">{{ isFrench ? 'Rien de pr\u00e9vu pour cette s\u00e9lection \u2014 essayez un autre jour ou filtre.' : 'Nothing scheduled for this selection \u2014 try another day or filter.' }}</p>
      }
    </section>
    <section class="center-cta"><h2>{{ isFrench ? 'Tous sont les bienvenus —' : 'All Are Welcome —' }} <em>{{ isFrench ? 'chaque jour' : 'Every Day' }}</em></h2><p>{{ isFrench ? 'Qu\u2019il s\u2019agisse d\u2019un appel \u00e0 la pri\u00e8re matinal, d\u2019un enseignement en semaine ou de Vision du Lundi \u2014 il y a toujours une porte ouverte dans la famille BRAAM.' : 'Whether it\u2019s an early morning prayer call, a midweek teaching, or Vision Monday \u2014 there is always an open door in the BRAAM Family.' }}</p><a class="gradient-button" routerLink="/contact">{{ isFrench ? 'Nous contacter' : 'Connect With Us' }} <span>\u2197</span></a></section>
  </main>
  `
})
export class SchedulePage {
  private readonly prefs = inject(PreferencesService);
  readonly scheduleFilters = ['All Events', 'Services'];
  scheduleFilter = 'All Events';
  scheduleView = 'Week';
  readonly weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  selectedDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  selectedDate = new Date();
  readonly events: ScheduleEvent[] = SCHEDULE_EVENTS;

  get isFrench() { return this.prefs.isFrench(); }

  frDay(day: string): string {
    if (!this.isFrench) return day;
    const map: Record<string, string> = { Sunday: 'Dimanche', Monday: 'Lundi', Tuesday: 'Mardi', Wednesday: 'Mercredi', Thursday: 'Jeudi', Friday: 'Vendredi', Saturday: 'Samedi' };
    return map[day] ?? day;
  }
  frFilter(f: string): string {
    if (!this.isFrench) return f;
    const map: Record<string, string> = { 'All Events': 'Tous les \u00e9v\u00e9nements', Services: 'Cultes' };
    return map[f] ?? f;
  }
  isToday(day: string) {
    return day === new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  }
  dateForDay(day: string) {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + this.weekDays.indexOf(day));
    return date.getDate();
  }
  selectScheduleDay(day: string) {
    this.selectedDay = day;
    this.selectedDate = new Date();
    this.selectedDate.setDate(this.selectedDate.getDate() - this.selectedDate.getDay() + this.weekDays.indexOf(day));
  }
  get filteredEvents() {
    return this.events.filter(
      (e) =>
        (this.scheduleView === 'List' || e.day === this.selectedDay) &&
        (this.scheduleFilter === 'All Events' ||
          e.kind.toLowerCase().includes(this.scheduleFilter.replace(/s$/, '').toLowerCase()))
    );
  }
  countForDay(day: string) {
    return this.events.filter((e) => e.day === day).length;
  }
}

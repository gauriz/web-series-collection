import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent {
  dataSource;
  columnsToDisplay = ['title', 'rating', 'genre', 'availableOn'];
  expandedElement: PeriodicElement | null;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'Netflix',
      this.domSanitizer.bypassSecurityTrustResourceUrl('https://cdn.worldvectorlogo.com/logos/netflix-1.svg'));
    this.matIconRegistry.addSvgIcon(
      'Prime',
      this.domSanitizer.bypassSecurityTrustResourceUrl('https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg'));
    this.matIconRegistry.addSvgIcon(
      'Disney',
      this.domSanitizer.bypassSecurityTrustResourceUrl('https://cdn.worldvectorlogo.com/logos/disney-1.svg'));
    this.dataSource = ELEMENT_DATA;
  }
}

export interface PeriodicElement {
  title: string;
  rating: number;
  availableOn: string[];
  genre: string[];
  description: string;
  quoteFrom: string;
  link: string;
  series: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    rating: 5,
    title: 'House M.D',
    availableOn: [],
    genre: ['Medical Drama'],
    description: `House (also called House, M.D.) is an American medical drama television series
     that originally ran on the Fox network for eight seasons, from November 16, 2004, to May 21, 2012.
     The series's main character is Dr. Gregory House (Hugh Laurie), an unconventional, misanthropic medical genius who, 
     despite his dependence on pain medication, leads a team of diagnosticians at the fictional Princeton–Plainsboro Teaching Hospital (PPTH) in New Jersey.`,
    quoteFrom: 'Wikipedia',
    link: 'https://www.gstatic.com/tv/thumb/tvbanners/8729531/p8729531_b_v8_ac.jpg',
    series: true
  },
  {
    rating: 4,
    title: 'Fringe',
    availableOn: ['Prime'],
    genre: ['Science fiction', 'Supernatural drama'],
    description: `Fringe follows the casework of the Fringe Division, a Joint Federal Task Force supported primarily by the Federal Bureau of Investigation,
     which includes Agent Olivia Dunham; Dr. Walter Bishop, the archetypal mad scientist; and Peter Bishop, Walter's estranged son and jack-of-all-trades.
      They are supported by Phillip Broyles (Lance Reddick), the force's director, and Agent Astrid Farnsworth (Jasika Nicole), who assists Walter
       in laboratory research`,
    quoteFrom: 'Wikipedia',
    link: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Fringe_S4_DVD.jpg/220px-Fringe_S4_DVD.jpg',
    series: true
  },
  {
    rating: 4,
    title: 'Kabir Singh',
    availableOn: ['Netflix', 'Prime', 'Disney'],
    genre: ['Romance', 'Action', 'Drama'],
    description: `Kabir Rajdheer Singh is a house surgeon at Delhi Institute of Medical Sciences. Despite being a brilliant student,
     he has severe anger management problems that earn the wrath of the college dean, Vijay K. Patkar. Kabir's aggressive nature also
      earns him a reputation among his juniors as a college bully. After having a brawl with Amit, one of the team members from another college,
       who ridiculed them during an inter-college football match, Vijay asks Kabir to either apologise or leave the college. Kabir initially chooses
        to leave but stays back after meeting and falling in love with first-year student Preeti Sikka`,
    quoteFrom: 'Wikipedia',
    link: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Kabir_Singh.jpg',
    series: false
  },
  {
    rating: 2,
    title: 'Agents of Shield',
    availableOn: ['Disney'],
    genre: ['Action', 'Drama', 'Science fiction', 'Superhero'],
    description: `The first season follows S.H.I.E.L.D. agent Phil Coulson as he puts together a small team of agents to handle strange new cases.
     They investigate Project Centipede and its leader, "The Clairvoyant", eventually uncovering that the organization is backed by the terrorist group Hydra,
      which has infiltrated S.H.I.E.L.D. In the second season, following the destruction of S.H.I.E.L.D. in Captain America: The Winter Soldier,
       Coulson becomes director of the organization and is tasked with rebuilding it while dealing with Hydra, a faction of anti-superhuman S.H.I.E.L.D. agents,
        and a newly revealed superhuman race called the Inhumans`,
    quoteFrom: 'Wikipedia',
    link: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Agents_of_S.H.I.E.L.D._logo.jpg',
    series: true
  },
];

import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TournamentPageComponent } from "./components/tournament-page/tournament-page.component";
import { BracketsManager } from 'brackets-manager';
import { InMemoryDatabase } from 'brackets-memory-db';

declare global {
  interface Window {
    bracketsViewer?: any | undefined;
  }
}

const dataset16 = {
};

function getNearestPowerOfTwo(input: number): number {
  return Math.pow(2, Math.ceil(Math.log2(input)));
}

const TOURNAMENT_ID = 'tournament-1'; // Replace with your actual tournament ID

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TournamentPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  private db: InMemoryDatabase = new InMemoryDatabase();
  private manager: BracketsManager;

  title = 'tournament-manager-ui';

  constructor() {
    this.db = new InMemoryDatabase();
    this.manager = new BracketsManager(this.db);
  }

  async ngAfterViewInit(): Promise<void> {
    (window as any).bracketsViewer.addLocale('en', {
      common: {
        'group-name-winner-bracket': '{{stage.name}}',
        'group-name-loser-bracket': '{{stage.name}} - Repechage',
      },
      'origin-hint': {
        'winner-bracket': 'WB {{round}}.{{position}}',
        'winner-bracket-semi-final': 'WB Semi {{position}}',
        'winner-bracket-final': 'WB Final',
        'consolation-final': 'Semi {{position}}',
      },
    });
    this.loadBrackets(dataset16).then((data: any) => {
      console.log('Brackets data loaded:', data);
      window.bracketsViewer.render(data, {
        selector: '#brackets',
      })
    });
  }

  private async loadBrackets(dataset: any): Promise<any> {
    this.db.setData({
      participant: dataset.roster.map((player: any) => ({
        ...player,
        tournament_id: TOURNAMENT_ID,
      })),
      stage: [],
      group: [],
      round: [],
      match: [],
      match_game: [],
    });

    await this.manager.create.stage({
      name: dataset.title,
      tournamentId: TOURNAMENT_ID,
      type: dataset.type,
      seeding: dataset.roster.map((player: any) => player.name),
      settings: {
        seedOrdering: ['natural'],
        size: getNearestPowerOfTwo(dataset.roster.length),
      },
    });

    const data = await this.manager.get.stageData(0);

    return {
      stages: data.stage,
      matches: data.match,
      matchGames: data.match_game,
      participants: data.participant,
    };
  }
}

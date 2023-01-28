import { Injectable } from '@nestjs/common';
import { TodayAtp, TodayWta } from 'src/modules/today/entity/today.entity';
import { Repository } from "typeorm";
import { SharedService } from "./shared.service";
import { InjectRepository } from "@nestjs/typeorm";
import { H2hAtp, H2hWta } from "../modules/h2h/entity/h2h.entity";
import { TourType } from "../modules/shared/middlewares/tour.middleware";

@Injectable()
export class UpcomingMatchesService {

    constructor(
        private sharedService: SharedService,
        @InjectRepository(TodayAtp)
        private todayAtpRepository: Repository<TodayAtp>,
        @InjectRepository(TodayWta)
        private todayWtaRepository: Repository<TodayWta>,
        @InjectRepository(H2hAtp)
        private h2hAtpRepository: Repository<H2hAtp>,
        @InjectRepository(H2hWta)
        private h2hWtaRepository: Repository<H2hWta>
    ) {
    }


    async upcomingMatches({ date, limit }) {
        let h2hEntityApt = 'H2hAtp';
        let h2hEntityWta = 'H2hWta';
        console.log("!@#");
        const atpMatches = await this.todayAtpRepository
            .createQueryBuilder('today')
            .leftJoinAndSelect('today.player1', 'player1')
            .leftJoinAndSelect('today.player2', 'player2')
            .leftJoin('today.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndMapOne(
                'today.h2h',
                h2hEntityApt,
                'h2h',
                '(h2h.player1 = player1.id and h2h.player2 = player2.id) or (h2h.player1 = player2.id and h2h.player2 = player1.id)',
            ).select([
                'today.id',
                'today.date',
                'today.roundId',
                'today.odd1',
                'today.odd2',
                'today.seed1',
                'today.seed2',
                'player1.id',
                'player1.name',
                'player1.countryAcr',
                'player2.id',
                'player2.name',
                'player2.countryAcr',
                'tournament.name',
                'tournament.date',
                'tournament.id',
                'court.name',
                'h2h.player1Wins',
                'h2h.player2Wins',
            ])
            .where('today.date > :start_at', { start_at: date })
            .addSelect(limit === 1 ? 'MAX(h2h.player1Wins + h2h.player2Wins) as max_sum' : '')
            .andWhere("today.result=''")
            .andWhere('today.live is null')
            .andWhere('today.date is not null')
            .andWhere('today.complete is null')
            .limit(limit * 2)
            .groupBy('today.id, player1.id, player2.id, tournament.id, court.name, court.id, h2h.player1Wins, h2h.player2Wins, h2h.id')
            .orderBy('today.date', 'ASC')
            .getMany()
            .then((todayArray) => {
                return todayArray.map((today: TodayAtp | TodayWta | any) => ({
                    tournament: today.tournament,
                    court: today.court,
                    roundId: today.roundId,
                    date: today.date,
                    type: TourType.ATP,
                    player1: {
                        name: today.player1.name,
                        odd: today.odd1,
                        countryAcr: today.player1.countryAcr,
                        seed: today.seed1,
                        image: this.sharedService.getPlayerImage(TourType.WTA, today.player1.id),
                        id: today.player1.id
                    },
                    player2: {
                        name: today.player2.name,
                        odd: today.odd2,
                        countryAcr: today.player2.countryAcr,
                        seed: today.seed2,
                        image: this.sharedService.getPlayerImage(TourType.ATP, today.player2.id),
                    },
                    h2h:
                        (today.h2h?.player1Wins || 0) + '-' + (today.h2h?.player2Wins || 0),
                }));
            });

        const wtaMatches = await this.todayWtaRepository
            .createQueryBuilder('today')
            .leftJoinAndSelect('today.player1', 'player1')
            .leftJoinAndSelect('today.player2', 'player2')
            .leftJoin('today.tournament', 'tournament')
            .leftJoinAndSelect('tournament.court', 'court')
            .leftJoinAndMapOne(
                'today.h2h',
                h2hEntityWta,
                'h2h',
                '(h2h.player1 = player1.id and h2h.player2 = player2.id) or (h2h.player1 = player2.id and h2h.player2 = player1.id)',
            )
            .select([
                'today.id',
                'today.date',
                'today.roundId',
                'today.odd1',
                'today.odd2',
                'today.seed1',
                'today.seed2',
                'player1.id',
                'player1.name',
                'player1.countryAcr',
                'player2.id',
                'player2.name',
                'player2.countryAcr',
                'tournament.name',
                'tournament.date',
                'tournament.id',
                'court.name',
                'h2h.player1Wins',
                'h2h.player2Wins',
            ])
            .where('today.date > :start_at', { start_at: date })
            .addSelect(limit === 1 ? 'MAX(h2h.player1Wins + h2h.player2Wins) as max_sum' : '')
            .andWhere("today.result=''")
            .andWhere('today.live is null')
            .andWhere('today.complete is null')
            .andWhere('today.date is not null')
            .limit(limit * 2)
            .orderBy('today.date', 'ASC')
            .groupBy('today.id, player1.id, player2.id, tournament.id, court.name, court.id, h2h.player1Wins, h2h.player2Wins, h2h.id')
            .getMany()
            .then((todayArray) => {
                return todayArray.map((today: TodayAtp | TodayWta | any) => ({
                    tournament: today.tournament,
                    court: today.court,
                    roundId: today.roundId,
                    date: today.date,
                    type: 'wta',
                    player1: {
                        name: today.player1.name,
                        odd: today.odd1,
                        countryAcr: today.player1.countryAcr,
                        image: this.sharedService.getPlayerImage(TourType.WTA, today.player1.id),
                        id: today.player1.id,
                    },
                    player2: {
                        name: today.player2.name,
                        odd: today.odd2,
                        countryAcr: today.player2.countryAcr,
                        image: this.sharedService.getPlayerImage(TourType.WTA, today.player2.id),
                        id: today.player2.id
                    },
                    h2h:
                        (today.h2h?.player1Wins || 0) + '-' + (today.h2h?.player2Wins || 0),
                }));
            });
        const merged = [...atpMatches, ...wtaMatches];
        const firstPart = merged?.splice(0, limit);
        const lastElement = firstPart[firstPart.length - 1];
        const secondPart = merged?.splice(0, limit);
        const lastData = secondPart.filter(item => item.date === lastElement.date);
        const selected = [...firstPart, ...lastData];
        return { matches: selected };
    }


}

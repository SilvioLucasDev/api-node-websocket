import { type EmitTCP } from '@/application/contracts/adapters'
import { type GetRankingGrade } from '@/application/contracts/repositories'

export class GetRankingUseCase {
  constructor (
    private readonly gradeRepository: GetRankingGrade,
    private readonly socketio: EmitTCP
  ) {}

  async execute (): Promise<void> {
    const rank = await this.gradeRepository.getRanking()
    console.log(rank)
    // this.socketio.emit({
    //   event: 'podium',
    //   data: {
    //     schoolData: rankByData,
    //     schoolTech: rankByTech,
    //     schoolProduct: rankByProduct,
    //     podium: rankPodium
    //   }
    // })
  }
}

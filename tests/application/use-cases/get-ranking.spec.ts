import { GetRankingUseCase } from '@/application/use-cases'
import { GetRankingStudent } from '@/application/contracts/repositories'
import { EmitWebSocket } from '@/application/contracts/adapters'

import { type MockProxy, mock } from 'jest-mock-extended'

describe('GetRankingUseCase', () => {
  let rankStudentsBySchool: Record<string, object[]>
  let rankStudents: object[]

  let sut: GetRankingUseCase
  let studentRepository: MockProxy<GetRankingStudent>
  let websocket: MockProxy<EmitWebSocket>


  beforeAll(() => {
    rankStudentsBySchool = {
      'school_1': [{ data: 'any_data_1' }],
      'school_2': [{ data: 'any_data_2' }],
    }
    rankStudents = [{ data: 'any_data' }]

    studentRepository = mock()
    studentRepository.getRanking.mockResolvedValue({ rankStudentsBySchool, rankStudents });
    websocket = mock<EmitWebSocket>();
    websocket.emit.mockImplementation(() => { });
  })

  beforeEach(() => {
    sut = new GetRankingUseCase(studentRepository, websocket)
  })

  it('should call method getRanking of StudentRepository', async () => {
    await sut.execute()

    expect(studentRepository.getRanking).toHaveBeenCalledTimes(1)
  })

  it('should call method emit of WebSocket with correct values', async () => {
    await sut.execute()

    expect(websocket.emit).toHaveBeenCalledWith({ event: 'podium', data: { rankStudentsBySchool, rankStudents } })
    expect(websocket.emit).toHaveBeenCalledTimes(1)
  })
})

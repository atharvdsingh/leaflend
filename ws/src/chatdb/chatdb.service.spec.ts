import { Test, TestingModule } from '@nestjs/testing';
import { ChatdbService } from './chatdb.service';

describe('ChatdbService', () => {
  let service: ChatdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatdbService],
    }).compile();

    service = module.get<ChatdbService>(ChatdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@condi/infrastructure/controllers/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe({
        stauts: 200,
        message: 'Server is up',
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@users/infrastructure/controllers/v1/users.controller';
import { UsersService } from '@users/application/services/users.service';
//import { RmqContext } from '@nestjs/microservices';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usersController).toBeDefined();
    });
  });
});

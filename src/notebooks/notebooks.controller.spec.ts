import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('NotebooksController', () => {
  let controller: NotebooksController;
  let service: {
    findAll: jest.Mock;
    create: jest.Mock;
  };

  const mockNotebookService = () => ({
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({ marca: "test", problema: "test" }),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useFactory: mockNotebookService,
        },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get(NotebooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("deberia retornar un array de notebooks", async () => {
    const notebooks = await controller.findAll();
    expect(notebooks).toBeInstanceOf(Array);
  });

  it("deberia crear un notebook", async () => {
    const notebook = await controller.create({marca: "test", problema: "test"});
    expect(notebook).toBeInstanceOf(Object);
  });
  
  it("deberia lanzar una HttpException si el servicio falla", async () => {
    service.findAll.mockRejectedValueOnce(new Error("DB error"));
    await expect(controller.findAll()).rejects.toThrow(HttpException);
    await expect(controller.findAll()).rejects.toThrow('Error retrieving notebooks');
  });

  it("deberia lanzar un error al crear un notebook", async () => {
    service.create.mockRejectedValueOnce(new Error("DB error"));
    await expect(controller.create({marca: "test", problema: "test"})).rejects.toThrow(HttpException);
    await expect(controller.create({marca: "test", problema: "test"})).rejects.toThrow('Error creating notebook');
    });
});

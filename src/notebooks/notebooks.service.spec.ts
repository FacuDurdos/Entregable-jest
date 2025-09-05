import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('NotebooksService', () => {
  let service: NotebooksService;
  let repo: jest.Mocked<Repository<Notebook>>;

  const mockCreateNotebook = {marca: "test", problema: "test"};
  const mockSaveNotebook = {id: 1, ...mockCreateNotebook};

  const mockNotebookRepo = {
    create: jest.fn().mockReturnValue(mockCreateNotebook),
    save: jest.fn().mockResolvedValue(mockSaveNotebook),
    find: jest.fn().mockResolvedValue([mockSaveNotebook]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotebooksService, { provide: getRepositoryToken(Notebook), useValue: mockNotebookRepo }],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
    repo = module.get(getRepositoryToken(Notebook));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("deberia retornar un array de notebooks", async () => {
    const notebooks = await service.findAll();
    expect(notebooks).toEqual([{id: 1, marca: "test", problema: "test"}]);
    expect(repo.find).toHaveBeenCalled();
  });

  it("deberia crear un notebook", async () => {
    const dto = {marca: "test", problema: "test"}
    const notebook = await service.create(dto);
    expect(notebook).toEqual({id: 1, marca: "test", problema: "test"});
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith({marca: "test", problema: "test"});
  });
});

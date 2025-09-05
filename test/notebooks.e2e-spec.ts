import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('NotebooksController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/notebooks (GET)', () => {
        return request(app.getHttpServer())
            .get('/notebooks')
            .expect(200);
    });

    it('/notebooks (POST)', () => {
        return request(app.getHttpServer())
            .post('/notebooks')
            .send({marca: "test", problema: "test"})
            .expect(201);
    });
});
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";

describe("BookController (e2e)", () => {
  let app: INestApplication;
  const bookService = {
    findAll: () => [
      {
        name: "Test Book",
        description: "Test Description",
        date: "2023-10-01",
        isbn: "123-456-789",
      },
    ],
    findOne: (id) =>
      Promise.resolve({
        _id: id,
        name: "Test Book",
        description: "Test Description",
        date: "2023-10-01",
        isbn: "123-456-789",
      }),
    create: (book) => Promise.resolve({ _id: "someBookId", ...book }),
    update: (id, book) => Promise.resolve({ _id: id, ...book }),
    destroy: (id) => Promise.resolve({ _id: id }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: bookService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/GET books", () => {
    return request(app.getHttpServer())
      .get("/book")
      .expect(200)
      .expect(bookService.findAll());
  });

  it("/GET book", async () => {
    return request(app.getHttpServer())
      .get("/book/1")
      .expect(200)
      .expect(await bookService.findOne("1"));
  });

  it("/POST books", () => {
    const book = {
      name: "Test Book",
      description: "Test Description",
      date: "2023-10-01",
      isbn: "123-456-789",
    };
    const expectedResponse = { _id: "1", ...book };
    jest.spyOn(bookService, "create").mockResolvedValue(expectedResponse);

    return request(app.getHttpServer())
      .post("/book")
      .send(book)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expectedResponse);
      });
  });

  it("/delete book", async () => {
    return request(app.getHttpServer())
      .delete("/book/1")
      .expect(200)
      .expect(await bookService.destroy("1"));
  });

  afterAll(async () => {
    await app.close();
  });
});

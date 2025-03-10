import { describe, expect, test } from "vitest";
import { StreamableItem, FilmItem, DocumentaryItem, HasSeason } from "../src/ejercicio-1";
import { isDocumentaryItem, isFilmItem } from "../src/ejercicio-1";
import { Series, Films, Documentaries, BasicStreamableCollection } from "../src/ejercicio-1";

describe("Test para las interfaces", () => {
  test("StreamableItem debe definir getName() y getYear()", () => {
    const item: StreamableItem = {
      getName: () => "Item de prueba",
      getYear: () => 2023
    };
    expect(item.getName()).toBe("Item de prueba");
    expect(item.getYear()).toBe(2023);
  });

  test("FilmItem debe definir getDirector()", () => {
    const film: FilmItem = {
      getName: () => "Película de prueba",
      getYear: () => 2022,
      getDirector: () => "Director de prueba"
    };
    expect(film.getDirector()).toBe("Director de prueba");
  });

  test("DocumentaryItem debe definir getGenre()", () => {
    const doc: DocumentaryItem = {
      getName: () => "Documental de prueba",
      getYear: () => 2021,
      getGenre: () => "Historia"
    };
    expect(doc.getGenre()).toBe("Historia");
  });

  test("HasSeason debe definir getSeason()", () => {
    const seasonItem: HasSeason = {
      getSeason: () => 2
    };
    expect(seasonItem.getSeason()).toBe(2);
  });
});


describe("Test para funciones de verificación de tipo", () => {
  test("isFilmItem debe identificar un objeto FilmItem", () => {
    const film: FilmItem = {
      getName: () => "Película",
      getYear: () => 2022,
      getDirector: () => "Director"
    };
    expect(isFilmItem(film)).toBe(true);
  });

  test("isFilmItem debe devolver false para otros tipos", () => {
    const doc: DocumentaryItem = {
      getName: () => "Documental",
      getYear: () => 2021,
      getGenre: () => "Ciencia"
    };
    expect(isFilmItem(doc)).toBe(false);
  });

  test("isDocumentaryItem debe identificar un objeto DocumentaryItem", () => {
    const doc: DocumentaryItem = {
      getName: () => "Documental",
      getYear: () => 2021,
      getGenre: () => "Historia"
    };
    expect(isDocumentaryItem(doc)).toBe(true);
  });

  test("isDocumentaryItem debe devolver false para otros tipos", () => {
    const film: FilmItem = {
      getName: () => "Película",
      getYear: () => 2022,
      getDirector: () => "Director"
    };
    expect(isDocumentaryItem(film)).toBe(false);
  });
});


describe("Test para BasicStreamableCollection y sus subclases", () => {
  const mockSeriesItem = {
    getName: () => "Breaking Code",
    getYear: () => 2019,
    getSeason: () => 3
  };

  const mockFilmItem = {
    getName: () => "The Matrix Dev",
    getYear: () => 1999,
    getDirector: () => "Lana Wachowski"
  };

  const mockDocumentaryItem = {
    getName: () => "Historia de TypeScript",
    getYear: () => 2020,
    getGenre: () => "Tecnología",
    getSeason: () => 1
  };

  test("Series hereda de BasicStreamableCollection", () => {
    const series = new Series([mockSeriesItem], "Mis Series");
    expect(series).toBeInstanceOf(BasicStreamableCollection);
  });

  test("Films hereda de BasicStreamableCollection", () => {
    const films = new Films([mockFilmItem], "Mis Películas");
    expect(films).toBeInstanceOf(BasicStreamableCollection);
  });

  test("Documentaries hereda de BasicStreamableCollection", () => {
    const documentaries = new Documentaries([mockDocumentaryItem], "Mis Documentales");
    expect(documentaries).toBeInstanceOf(BasicStreamableCollection);
  });

  test("Series puede buscar por temporada", () => {
    const series = new Series([mockSeriesItem], "Series Tech");
    expect(series.searchBySeason(3)).toHaveLength(1);
    expect(series.searchBySeason(2)).toHaveLength(0);
  });

  test("Films puede buscar por director", () => {
    const films = new Films([mockFilmItem], "Películas Clásicas");
    expect(films.getFilmsByDirector("Lana Wachowski")).toHaveLength(1);
    expect(films.getFilmsByDirector("Otro Director")).toHaveLength(0);
  });

  test("Documentaries puede buscar por género", () => {
    const documentaries = new Documentaries([mockDocumentaryItem], "Docs");
    expect(documentaries.getDocumentariesByGenre("Tecnología")).toHaveLength(1);
    expect(documentaries.getDocumentariesByGenre("Historia")).toHaveLength(0);
  });

  test("BasicStreamableCollection puede buscar por nombre", () => {
    const series = new Series([mockSeriesItem], "Series Tech");
    expect(series.searchByName("Breaking Code")).toHaveLength(1);
    expect(series.searchByName("Otra Serie")).toHaveLength(0);
  });

  test("BasicStreamableCollection puede buscar por año", () => {
    const series = new Series([mockSeriesItem], "Series Tech");
    expect(series.searchByYear(2019)).toHaveLength(1);
    expect(series.searchByYear(2020)).toHaveLength(0);
  });
});


describe("Métodos comunes en BasicStreamableCollection", () => {
  test("Debe permitir agregar un elemento", () => {
    const mockItem: StreamableItem & HasSeason = {
      getName: () => "Nuevo Item",
      getYear: () => 2023,
      getSeason: () => 1,
    };

    const collection = new Series<StreamableItem & HasSeason>([], "Colección Vacía");
    collection.addItem(mockItem);

    expect(collection.getItems()).toHaveLength(1);
    expect(collection.getItems()[0].getName()).toBe("Nuevo Item");
  });

  test("Debe obtener el nombre de la colección", () => {
    const collection = new Series([], "Mi Colección");
    expect(collection.getName()).toBe("Mi Colección");
  });
});
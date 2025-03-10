import { describe, expect, test } from "vitest";
import { Artist, Disco, Single, Song, Discography, MusicLibrary, StatisticsService } from "../src/ejercicio-2";

const statisticsService = new StatisticsService();

describe("Test para la clase Song", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);

  test("Existe la clase Song", () => {
    expect(Song).toBeDefined();
  });

  test("Debe poder instanciar un objeto Song", () => {
    expect(song).toBeInstanceOf(Song);
  });

  test("Debe almacenar correctamente el nombre de la canción", () => {
    expect(song.name).toBe("Usseewa");
  });

  test("Debe almacenar correctamente la duración en segundos", () => {
    expect(song.duration).toBe(207);
  });

  test("Debe almacenar correctamente los géneros", () => {
    expect(song.genres).toContain("J-pop");
    expect(song.genres).toContain("J-Rock");
  });

  test("Debe indicar correctamente si es un single", () => {
    expect(song.is_single).toBe(true);
  });

  test("Debe almacenar correctamente la cantidad de reproducciones", () => {
    expect(song.reproductions).toBe(518000000);
  });

  test("Debe lanzar un error si las reproducciones no son enteras y positivas", () => {
    expect(() => new Song("Test", 3.50, ["Pop"], false, -1)).toThrow(
      "Error. Las reproducciones han de ser un número positivo y entero."
    );
  });

  test("Debe calcular correctamente la duración en segundos", () => {
    const songTest = new Song("Test", 2.45, ["Pop"], false, 100);
    expect(songTest.duration).toBe(165);
  });
});

describe("Test para la clase Disco", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);
  const album = new Disco("Kyougen", 2022, [song]);

  test("Debe permitir instanciar un disco", () => {
    expect(album).toBeInstanceOf(Disco);
  });

  test("Debe almacenar correctamente el nombre y año del disco", () => {
    expect(album.name).toBe("Kyougen");
    expect(album.year).toBe(2022);
  });

  test("Debe almacenar correctamente las canciones", () => {
    expect(album.songs).toHaveLength(1);
    expect(album.songs[0].name).toBe("Usseewa");
  });

  test("Debe lanzar un error si el año del disco no está entre 1600 y 2025", () => {
    expect(() => new Disco("Antiguo", 1500, [song])).toThrow(
      "Error. El año debe ser un número entero y positivo y estar comprendido entre el 1600 y 2025."
    );
  });
});

describe("Test para la clase Single", () => {
  const song = new Song("Gyakko", 3.50, ["J-pop"], true, 1200000);
  const single = new Single("Gyakko", 2023, song);

  test("Debe permitir instanciar un single", () => {
    expect(single).toBeInstanceOf(Single);
  });

  test("Debe almacenar correctamente el nombre y año del single", () => {
    expect(single.name).toBe("Gyakko");
    expect(single.year).toBe(2023);
  });

  test("Debe almacenar correctamente la canción del single", () => {
    expect(single.song.name).toBe("Gyakko");
  });
});

describe("Test para la clase Discography", () => {
  test("Debe permitir agregar y obtener elementos de una discografía de álbumes", () => {
    const song = new Song("Usseewa", 3.27, ["J-pop"], true, 518000000);
    const album = new Disco("Kyougen", 2022, [song]);
  
    const albumDiscography = new Discography<Disco>([album]);
    const newAlbum = new Disco("Shingeki", 2021, [song]);
    albumDiscography.addItem(newAlbum);
  
    expect(albumDiscography.getItems()).toHaveLength(2);
    expect(albumDiscography.getItems()[1].name).toBe("Shingeki");
  });
  
  test("Debe permitir agregar y obtener elementos de una discografía de singles", () => {
    const song = new Song("Gyakko", 3.50, ["J-pop"], true, 1200000);
    const single = new Single("Gyakko", 2023, song);
  
    const singleDiscography = new Discography<Single>([single]);
  
    const newSingle = new Single("Blue Bird", 2022, song);
    singleDiscography.addItem(newSingle);
  
    expect(singleDiscography.getItems()).toHaveLength(2);
    expect(singleDiscography.getItems()[1].name).toBe("Blue Bird");
  });
});

describe("Test para la clase Artist", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop"], true, 518000000);
  const album = new Disco("Kyougen", 2022, [song]);
  const discography = new Discography([album]);
  const artist = new Artist("Ado", 7018780, discography);

  test("Debe permitir instanciar un artista", () => {
    expect(artist).toBeInstanceOf(Artist);
  });

  test("Debe almacenar correctamente el nombre y oyentes", () => {
    expect(artist.name).toBe("Ado");
    expect(artist.monthly_listeners).toBe(7018780);
  });

  test("Debe lanzar un error si los oyentes no son enteros y positivos", () => {
    expect(() => new Artist("Ado", -1, discography)).toThrow(
      "Error. Los oyentes mensuales deben ser un número entero y positivo."
    );
  });
});

describe("Test para la clase StatisticsService", () => {
  const song = new Song("Usseewa", 3.27, ["J-pop"], true, 518000000);
  const album = new Disco("Kyougen", 2022, [song]);
  const single = new Single("Gyakko", 2023, song);
  const statsService = new StatisticsService();

  test("Debe calcular el número de canciones en un disco", () => {
    expect(statsService.getNumberOfSongs(album)).toBe(1);
  });

  test("Debe calcular la duración total de un disco", () => {
    expect(statsService.getDiscoDuration(album)).toBe(207);
  });

  test("Debe calcular la cantidad de reproducciones de un disco", () => {
    expect(statsService.getDiscoReproductions(album)).toBe(518000000);
  });

  test("Debe calcular la duración de un single", () => {
    expect(statsService.getSingleDuration(single)).toBe(207);
  });

  test("Debe calcular las reproducciones de un single", () => {
    expect(statsService.getSingleReproductions(single)).toBe(518000000);
  });
});

describe("Test para la clase MusicLibrary", () => {
  const library = new MusicLibrary(statisticsService);
  const song = new Song("Usseewa", 3.27, ["J-pop"], true, 518000000);
  const album = new Disco("Kyougen", 2022, [song]);
  const discography = new Discography([album]);
  const artist = new Artist("Ado", 7018780, discography);

  test("Debe permitir instanciar una biblioteca de música", () => {
    expect(library).toBeInstanceOf(MusicLibrary);
  });

  test("Debe permitir agregar artistas", () => {
    library.addArtist(artist);
    expect(library["artists"]).toHaveLength(1);
  });

  test("Debe lanzar error si busca un artista inexistente", () => {
    expect(() => library.listArtistDiscography("Desconocido")).toThrow(
      "No se encontró el artista 'Desconocido'"
    );
  });

  test("Debe permitir buscar una canción por nombre", () => {
    expect(() => library.searchSongByName("Usseewa")).not.toThrow();
  });
});
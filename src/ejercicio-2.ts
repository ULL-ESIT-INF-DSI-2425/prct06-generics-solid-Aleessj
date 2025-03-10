/**
 * Representa un sencillo musical (single).
 */
export interface ISingle {
  name: string;
  year: number;
  song: ISong
}

/**
 * Representa un álbum musical (disco).
 */
export interface IDisco {
  name: string;
  year: number;
  songs: ISong[];
}

/**
 * Representa una canción musical.
 */
export interface ISong {
  name: string;
  duration: number; 
  genres: string[];
  is_single: boolean;
  reproductions: number;
}

/**
 * Representa un artista con su discografía (álbumes o singles).
 */
export class Artist<T extends IDisco | ISingle> {
   /**
   * Crea una instancia de un artista.
   * @param name - Nombre del artista.
   * @param monthly_listeners - Número de oyentes mensuales.
   * @param discography - Discografía del artista (álbumes o singles).
   * @throws Error si los oyentes mensuales no son un número entero positivo.
   */
  constructor(public name: string, public monthly_listeners: number, public discography: Discography<T>) {
    if (!Number.isInteger(monthly_listeners) || monthly_listeners < 0) throw new Error("Error. Los oyentes mensuales deben ser un número entero y positivo.");
  }
}

/**
 * Representa un sencillo musical.
 */
export class Single implements ISingle {
  /**
   * Crea una instancia de un single.
   * @param name - Nombre del single.
   * @param year - Año de lanzamiento del single.
   * @param song - Canción incluida en el single.
   * @throws Error si el año no está entre 1600 y 2025.
   */
  constructor(public name: string, public year:number, public song: ISong) {
    if (!Number.isInteger(year) || (year < 1600 || year > 2025)) throw new Error("Error. El año debe ser un número entero y positivo y estar comprendido entre el 1600 y 2025.");
  }
}

/**
 * Representa un disco con varias canciones.
 */
export class Disco implements IDisco {
  /**
   * Crea una instancia de un disco.
   * @param name - Nombre del disco.
   * @param year - Año de lanzamiento del disco.
   * @param songs - Lista de canciones incluidas en el disco.
   * @throws Error si el año no está entre 1600 y 2025.
   */
  constructor(public name: string, public year:number, public songs: ISong[]) {
    if (!Number.isInteger(year) || (year < 1600 || year > 2025)) throw new Error("Error. El año debe ser un número entero y positivo y estar comprendido entre el 1600 y 2025.");
  }
}

/**
 * Proporciona métodos para calcular estadísticas de discos y singles.
 */
export class StatisticsService {
  /**
   * Obtiene el número de canciones en un disco.
   * @param disco - Disco del cual obtener el número de canciones.
   * @returns Número total de canciones en el disco.
   */
  getNumberOfSongs(disco: IDisco): number { return disco.songs.length; }

  /**
   * Calcula la duración total de un disco en segundos.
   * @param disco - Disco del cual obtener la duración total.
   * @returns Duración total del disco en segundos.
   */
  getDiscoDuration(disco: IDisco): number { return disco.songs.reduce((total, song) => total + song.duration, 0); }

  /**
   * Calcula el total de reproducciones de un disco.
   * @param disco - Disco del cual obtener el total de reproducciones.
   * @returns Número total de reproducciones del disco.
   */
  getDiscoReproductions(disco: IDisco): number { return disco.songs.reduce((total, song) => total + song.reproductions, 0); }

  /**
   * Obtiene la duración de un single.
   * @param single - Single del cual obtener la duración.
   * @returns Duración en segundos.
   */
  getSingleDuration(single: ISingle): number { return single.song.duration; }

  /**
   * Obtiene el total de reproducciones de un single.
   * @param single - Single del cual obtener el total de reproducciones.
   * @returns Número total de reproducciones.
   */
  getSingleReproductions(single: ISingle): number { return single.song.reproductions; }
}

/**
 * Representa una canción.
 */
export class Song implements ISong {
  /**
   * Crea una nueva instancia de canción.
   * @param name - Nombre de la canción.
   * @param duration - Duración en minutos y segundos.
   * @param genres - Lista de géneros de la canción.
   * @param is_single - Indica si la canción es un single.
   * @param reproductions - Número de reproducciones.
   * @throws Error si las reproducciones no son un número entero positivo.
   */
  constructor(public name: string, public duration: number, public genres: string[], public is_single: boolean, public reproductions: number) {
    if (!Number.isInteger(reproductions) || reproductions < 0) throw new Error("Error. Las reproducciones han de ser un número positivo y entero.");
    this.duration = this.getDurationInSeconds(duration);
  }

  /**
   * Convierte la duración de la canción en segundos.
   * @param duration - Duración en minutos y segundos.
   * @returns Duración en segundos.
   */
  private getDurationInSeconds(duration: number): number {
    if (!Number.isInteger(duration)) {
      let aux: string = duration.toString();
      let parts: string[] = aux.split(".");

      if (parts.length === 2) {
        let min = parseInt(parts[0], 10);
        let sec = parseInt(parts[1], 10);

        return min * 60 + sec;
      }
    }
    return duration;
  }
}

/**
 * Representa una colección de álbumes o singles.
 */
export class Discography<T extends IDisco | ISingle> {
  private items: T[];

  /**
   * Crea una instancia de una discografía.
   * @param items - Lista inicial de álbumes o singles.
   */
  constructor(items: T[]) { this.items = items; }

  /**
   * Agrega un nuevo elemento a la discografía.
   * @param item - Álbum o single a agregar.
   */
  addItem(item: T): void { this.items.push(item); }

  /**
   * Obtiene todos los elementos de la discografía.
   * @returns Lista de álbumes o singles.
   */
  getItems(): T[] { return this.items; }
}

/**
 * Representa una biblioteca musical que almacena artistas y su discografía.
 * Permite buscar y listar canciones, álbumes y artistas.
 * 
 */
export class MusicLibrary<T extends IDisco | ISingle> {
  private artists: Artist<T>[];

  /**
   * Crea una instancia de `MusicLibrary`.
   * @param statisticsService - Servicio de estadísticas para obtener datos sobre la música.
   */
  constructor(private statisticsService: StatisticsService) {
    this.artists = [];
  }

  /**
   * Agrega un nuevo artista a la biblioteca.
   * @param artist - Artista a agregar.
   */
  addArtist(artist: Artist<T>): void {
    this.artists.push(artist);
  }

  /**
   * Muestra en formato tabla los artistas registrados en la biblioteca.
   */
  listArtists(): void {
    console.table(this.artists.map(artist => ({
      Artist: artist.name,
      "Oyentes mensuales": artist.monthly_listeners,
      "Albums y singles": artist.discography.getItems().length
    })));
  }

  /**
   * Lista la discografía de un artista en la biblioteca.
   * @param artistName - Nombre del artista a buscar.
   * @throws Error si el artista no se encuentra en la biblioteca.
   */
  listArtistDiscography(artistName: string): void {
    const artist = this.artists.find(a => a.name.toLowerCase() === artistName.toLowerCase());
    if (!artist) throw new Error(`No se encontró el artista '${artistName}'`);

    console.log(`Discografía de ${artist.name}:`);
    artist.discography.getItems().forEach((item) => {
      if ("songs" in item) { 
        console.log(`Álbum: ${item.name} (${item.year})`);
        console.table(item.songs.map(song => ({
          Song: song.name,
          Duration: song.duration + "s",
          Genres: song.genres.join(", "),
          Reproductions: song.reproductions
        })));
      } else { 
        console.log(`Single: ${item.name} (${item.year})`);
        console.table([{
          Song: item.song.name,
          Duration: this.statisticsService.getSingleDuration(item) + "s",
          Genres: item.song.genres.join(", "),
          Reproductions: this.statisticsService.getSingleReproductions(item)
        }]);
      }
    });
  }

  /**
   * Busca canciones en la biblioteca por su nombre y las muestra en formato tabla.
   * @param name - Nombre de la canción a buscar.
   * @throws Error si no se encuentra ninguna canción con ese nombre.
   */
  searchSongByName(name: string): void {
    const foundSongs: ISong[] = this.artists.flatMap(artist =>
      artist.discography.getItems().flatMap(item => {
        if ("songs" in item) return item.songs.filter(song => song.name.toLowerCase().includes(name.toLowerCase()));
        else return item.song.name.toLowerCase().includes(name.toLowerCase()) ? [item.song] : [];
      })
    );
    if (foundSongs.length === 0) throw new Error(`No se encontró ninguna canción con el nombre '${name}'`);

    console.table(foundSongs.map(song => ({
      Name: song.name,
      Duration: song.duration + "s",
      Genres: song.genres.join(", "),
      Single: song.is_single ? "Yes" : "No",
      Reproductions: song.reproductions
    })));
  }

  /**
   * Muestra toda la biblioteca musical en formato tabla.
   */
  showLibrary(): void {
    console.log("Music Library:");
    console.table(this.artists.map(artist => ({
      Artist: artist.name,
      "Monthly Listeners": artist.monthly_listeners,
      "Albums y singles": artist.discography.getItems().length
    })));

    this.artists.forEach((artist) => { 
      console.log(`Discografía de ${artist.name}:`);
      artist.discography.getItems().forEach((item) => { 
        if ("songs" in item) {
          console.table([{
            Type: "Album",
            Name: item.name,
            Year: item.year,
            "Number of Songs": this.statisticsService.getNumberOfSongs(item),
            Duration: this.statisticsService.getDiscoDuration(item) + "s",
            Reproductions: this.statisticsService.getDiscoReproductions(item)
          }]);

          console.log(`Canciones en '${item.name}':`);
          console.table(item.songs.map(song => ({
            Song: song.name,
            Duration: song.duration + "s",
            Genres: song.genres.join(", "),
            Single: song.is_single ? "Yes" : "No",
            Reproductions: song.reproductions
          })));
        } else {
          console.table([{
            Type: "Single",
            Name: item.name,
            Year: item.year,
            Duration: this.statisticsService.getSingleDuration(item) + "s",
            Genres: item.song.genres.join(", "),
            Reproductions: this.statisticsService.getSingleReproductions(item)
          }]);
        }
      });
      console.log("\n");
    });
  }
}

/*const statsService = new StatisticsService();

const song1 = new Song("Gyakko", 3.58, ["J-pop", "J-Rock"], false, 224000000);
const song2 = new Song("Usseewa", 3.27, ["J-pop", "J-Rock"], true, 518000000);
const song3 = new Song("Freedom", 3.02, ["J-pop", "J-Rock"], true, 9600000);
const song4 = new Song("Show", 2.45, ["J-pop"], true, 10000000);

const album = new Disco("Kyougen", 2022, [song2, song3]);
const single = new Single("Show", 2023, song4);

const onlyAlbums = new Discography<Disco>([album]);
const onlySingles = new Discography<Single>([single]);
const mixedDiscography = new Discography<Disco | Single>([album, single]);

const artistWithAlbums = new Artist<Disco>("Ado (Albums)", 7018780, onlyAlbums);
const artistWithSingles = new Artist<Single>("Ado (Singles)", 5000000, onlySingles);
const artistWithMixed = new Artist<Disco | Single>("Ado (Mixed)", 8000000, mixedDiscography);

const library = new MusicLibrary<Disco | Single>(statsService);
library.addArtist(artistWithAlbums);
library.addArtist(artistWithSingles);
library.addArtist(artistWithMixed);

library.showLibrary();*/
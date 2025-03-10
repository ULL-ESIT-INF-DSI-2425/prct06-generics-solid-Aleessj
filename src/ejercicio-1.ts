/**
 * Interfaz que representa un elemento transmisible (streamable).
 * Un elemento debe tener un nombre y un año de lanzamiento.
 */
export interface StreamableItem {
  /**
   * Obtiene el nombre del elemento.
   * @returns El nombre del elemento.
   */
  getName(): string;

  /**
   * Obtiene el año de lanzamiento del elemento.
   * @returns Año de lanzamiento del elemento.
   */
  getYear(): number;
}

/**
 * Representa un elemento de tipo película en una colección de streaming.
 * Extiende `StreamableItem` e incluye información sobre su director.
 */
export interface FilmItem extends StreamableItem {
  /**
   * Obtiene el nombre del director de la película.
   * @returns Nombre del director.
   */
  getDirector(): string;
}

/**
 * Representa un elemento de tipo documental en una colección de streaming.
 * Extiende `StreamableItem` e incluye información sobre su género.
 */
export interface DocumentaryItem extends StreamableItem {
  /**
   * Obtiene el género del documental.
   * @returns Género del documental.
   */
  getGenre(): string;
}

/**
 * Interfaz que representa un elemento que tiene temporadas.
 * Se usa para series o cualquier contenido que tenga múltiples temporadas.
 */
export interface HasSeason {
  /**
   * Obtiene el número de temporada del elemento.
   * @returns Número de temporada.
   */
  getSeason(): number;
}

/**
 * Interfaz genérica para una colección de elementos de streaming.
 * Define operaciones básicas para agregar y buscar elementos.
 */
export interface Stremeable<T> {
  /**
   * Agrega un nuevo elemento a la colección.
   * @param item - Elemento a agregar.
   */
  addItem(item: T): void;

  /**
   * Obtiene todos los elementos de la colección.
   * @returns Lista de elementos almacenados.
   */
  getItems(): T[];

  /**
   * Busca elementos por nombre.
   * @param name - Nombre del elemento a buscar.
   * @returns Lista de elementos cuyo nombre coincide con el criterio de búsqueda.
   */
  searchByName(name: string): T[];

  /**
   * Busca elementos por año de lanzamiento.
   * @param year - Año de lanzamiento a buscar.
   * @returns Lista de elementos cuyo año coincide con el criterio de búsqueda.
   */
  searchByYear(year: number): T[];
}

/**
 * Verifica si un elemento es un `FilmItem`.
 * @param item - Elemento a verificar.
 * @returns `true` si el elemento tiene `getDirector()`, de lo contrario `false`.
 */
export function isFilmItem(item: unknown): item is FilmItem {
  return typeof item === "object" && item !== null && "getDirector" in item && typeof (item as FilmItem).getDirector === "function";
}

/**
 * Verifica si un elemento es un `DocumentaryItem`.
 * @param item - Elemento a verificar.
 * @returns `true` si el elemento tiene `getGenre()`, de lo contrario `false`.
 */
export function isDocumentaryItem(item: unknown): item is DocumentaryItem {
  return typeof item === "object" && item !== null && "getGenre" in item && typeof (item as DocumentaryItem).getGenre === "function";
}


/**
 * Clase base abstracta para colecciones de elementos que pueden ser transmitidos (streaming).
 */
export abstract class BasicStreamableCollection<T extends StreamableItem> implements Stremeable<T> {
  /**
   * Crea una colección básica de elementos para streaming.
   * @param items - Lista de elementos de la colección.
   * @param name - Nombre de la colección.
   */
  constructor(protected items: T[], private readonly name: string) {}

  addItem(item: T): void { this.items.push(item); }
  getItems(): T[] { return this.items; }
  getName(): string { return this.name; }

  /**
   * Busca una serie, pelicula o documental por el nombre.
   * @param year - Año de estreno
   * @returns serie, pelicula o documental
   */
  searchByName(name: string): T[] {
    return this.items.filter((item) => item.getName().toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Busca una serie, pelicula o documental por el año de estreno.
   * @param year - Año de estreno
   * @returns serie, pelicula o documental
   */
  searchByYear(year: number): T[] {
    return this.items.filter(item => item.getYear() === year);
  }

  /**
   * Busca elementos por temporada. Solo se implementa en clases que manejen temporadas.
   * @param season - Número de temporada a buscar.
   * @returns - Lista de elementos que coinciden con la temporada buscada.
   */
  abstract searchBySeason(season: number): T[];
}
/**
 * Representa una colección de series en streaming.
 * Cada serie tiene un nombre, un año y una o más temporadas.
 */
export class Series<T extends StreamableItem & HasSeason> extends BasicStreamableCollection<T> {
  /**
   * Busca series por temporada.
   * @param season - Número de la temporada a buscar.
   * @returns Lista de series que pertenecen a la temporada especificada.
   */
  searchBySeason(season: number): T[] {
    return this.items.filter(item => item.getSeason() === season);
  }
}

/**
 * Representa una colección de películas en streaming.
 * Cada película tiene un nombre y un año de lanzamiento.
 */
export class Films<T extends StreamableItem> extends BasicStreamableCollection<T> {
  /**
   * Busca películas dirigidas por un director en específico.
   * @param director-  Nombre del director.
   * @returns Lista de películas dirigidas por el director dado.
   */
  getFilmsByDirector(director: string): T[] {
    return this.items.filter(item => isFilmItem(item) && item.getDirector() === director);
  }

  /**
   * Método requerido por BasicStreamableCollection, pero no aplicable a películas.
   * Retorna un array vacío ya que las películas no tienen temporadas.
   * @param season - Número de temporada.
   * @returns Array vacío.
   */
  searchBySeason(season: number): T[] {
    return [];
  }
}

/**
 * Representa una colección de documentales en streaming.
 * Cada documental tiene un nombre, un año y puede tener temporadas.
 */
export class Documentaries<T extends StreamableItem & HasSeason> extends BasicStreamableCollection<T> {
  /**
   * Busca documentales por temporada.
   * @param season - Número de la temporada a buscar.
   * @returns Lista de documentales que pertenecen a la temporada especificada.
   */
  searchBySeason(season: number): T[] {
    return this.items.filter(item => item.getSeason() === season);
  }

  /**
   * Obtiene todos los documentales de un género específico.
   * @param genre - Género del documental a buscar.
   * @returns Lista de documentales que pertenecen al género especificado.
   */
  getDocumentariesByGenre(genre: string): T[] {
    return this.items.filter(item => isDocumentaryItem(item) && item.getGenre() === genre);
  }
}
export interface ProductType {
  id: number,
  name: string,
  brand: string,
  year: number,
  description : string,
  capacity: number[],
  images: {
    main: string,
    list?: string[]
  },
  price: {
    normal: number,
    sale: number | null
  },
  attributes?: {
    type?: string,
    gender?: string,
    aroma?: string,
    stability?: string
    classification?: string,
  }
}
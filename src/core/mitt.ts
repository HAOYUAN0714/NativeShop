import mitt from 'mitt'

type Emitter = {
  requestError: { response: any; code: number; message: string }
}

export const emitter = mitt<Emitter>()

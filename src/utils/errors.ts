export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Yetkisiz erişim') {
    super(message, 401)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Kaynak bulunamadı') {
    super(message, 404)
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Geçersiz veri') {
    super(message, 400)
  }
}

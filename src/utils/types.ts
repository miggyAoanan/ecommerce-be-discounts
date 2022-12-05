export type CustomResponse<T> = {
    status: 'success' | 'fail';
    data?: T | T[] | null;
    message?: string;
  };
  
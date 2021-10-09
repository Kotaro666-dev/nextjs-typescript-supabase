const authMiddleware = (store: any) => (next: any) => (action: any) => {
  return next(action);
};

export default authMiddleware;

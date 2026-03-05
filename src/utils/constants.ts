export const PROVIDE = {
  DATABASE: 'DATABASE_CONNECTION',
  CONTRIBUTOR: 'CONTRIBUTOR_MODEL',
  DOCUMENT: 'DOCUMENT_MODEL',
};

export const DOCUMENT_TYPES = ['cpf', 'certidao', 'aso'] as const;

export const MODEL = {
  CONTRIBUTOR: 'Contributor',
  DOCUMENT: 'Document',
};

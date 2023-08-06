import app from '@/app';

import BadRequestError from '@/errors/BadRequestError';
import BaseError from '@/errors/BaseError';
import InternalError from '@/errors/InternalError';
import NotFoundError from '@/errors/NotFoundError';

import {
  getLc116Ibpt,
  SIGLAS_UF,
  validateNotOnlyNumber,
} from '../../../../../../services/ibpt';

const action = async (request, response) => {
  try {
    if (!request.query.uf) {
      throw new BadRequestError({
        message: 'UF não enviada.',
        type: 'IBPT_LC116_BAD_REQUEST',
      });
    }

    const uf = request.query.uf.toUpperCase();

    if (!SIGLAS_UF.includes(uf)) {
      throw new BadRequestError({
        message: 'UF não encontrada.',
        type: 'IBPT_LC116_BAD_REQUEST',
      });
    }

    const { codigo, ex = '' } = request.query;

    if (!codigo) {
      throw new BadRequestError({
        message: 'Código não enviado.',
        type: 'IBPT_LC116_BAD_REQUEST',
      });
    }

    if (codigo.length !== 4) {
      throw new BadRequestError({
        message: 'Código do LC 116 deve ter 4 digitos.',
        type: 'IBPT_LC116_BAD_REQUEST',
      });
    }

    if (validateNotOnlyNumber(codigo)) {
      throw new BadRequestError({
        message: 'Código do LC 116 deve ser um valor numérico.',
        type: 'IBPT_LC116_BAD_REQUEST',
      });
    }

    const aliquotas = await getLc116Ibpt({ uf });

    const retorno = aliquotas.find(
      (value) => value.codigo === codigo && value.ex === ex
    );

    if (!retorno) {
      throw new NotFoundError({
        message: 'LC 116 não encontrado.',
        type: 'IBPT_LC116_NOT_FOUND',
      });
    }

    response.status(200).json(retorno);
  } catch (err) {
    if (err instanceof BaseError) {
      throw err;
    }

    throw new InternalError({
      message: 'Erro ao buscar alíquotas LC 116.',
      type: 'IBPT_LC116_INTERNAL',
    });
  }
};

export default app({ cache: 86400 }).get(action);
import axios from 'axios';
import { localStorageAuthDataItemTitle } from './constantsApi';

axios.defaults.baseURL = 'https://api.example.com';
// Cria uma instância do axios com baseURL configurado a partir da variável de ambiente
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// Interceptor para adicionar o token de autenticação ao cabeçalho das requisições
api.interceptors.request.use((config) => {
  const userToken = JSON.parse(localStorage.getItem(localStorageAuthDataItemTitle)); // Recupera o token do localStorage
  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken.autenticationToken}`; // Define o token no cabeçalho
  }
  return config;
});

// Interceptor para tratamento de resposta e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response);
    return Promise.reject(error);
  }
);

// Função para fazer uma requisição GET
const get = async (path, params = {}) => {
  try {
    // Garante que `path` seja apenas o caminho relativo
    return await api.get(path, { params });
  } catch (e) {
    handleError(e);
    return { data: {} };
  }
};

// Função para fazer uma requisição POST
const post = async (path, params = {}, notificator) => {
  try {
    // Garante que `path` seja apenas o caminho relativo
    return await api.post(path, params);
  } catch (e) {
    handleError(e, notificator);
    return { data: {} };
  }
};

// Função para fazer uma requisição PUT
const put = async (path, params = {}) => {
  try {
    // Garante que `path` seja apenas o caminho relativo
    return await api.put(path, params);
  } catch (e) {
    handleError(e);
    return { data: {} };
  }
};

// Função para fazer uma requisição DELETE
const destroy = async (path, params = {}) => {
  try {
    // Garante que `path` seja apenas o caminho relativo
    return await api.delete(path, { params });
  } catch (e) {
    handleError(e);
    return { data: {} };
  }
};

// Função para lidar com erros e notificar o usuário
const handleError = (error, notificator) => {
  if (error?.response?.data?.messages?.length > 0) {
    error.response.data.messages.forEach(message => {
      if (error.response.status === 422) {
        const messageList = mountValidationsMessages(message);
        messageList.forEach((message) => {
          negativeNotify(message, notificator);
        });
      } else {
        error.response.data.messages.forEach(message => {
          negativeNotify(message, notificator);
        });
      }
    });
  } else {
    if (error.response?.status === 401) {
      warningNotify("Autenticação expirada, você será redirecionado para a tela de Login", notificator);
      localStorage.removeItem(localStorageAuthDataItemTitle);
      setTimeout(() => {
        window.location.href = '/login';
      }, 6000);
    } else {
      negativeNotify("Erro interno do servidor", notificator);
    }
  }
};

// Função para criar notificações de erro
const negativeNotify = (errorMessage = '', notificator) => {
  notificator(errorMessage, {
    variant: "error",
    autoHideDuration: 5000
  });
};

// Função para criar notificações de alerta
const warningNotify = (errorMessage = '', notificator) => {
  notificator(errorMessage, {
    variant: "warning",
    autoHideDuration: 5000
  });
};

// Função para montar mensagens de validação
function mountValidationsMessages(validationError) {
  const attributes = Object.keys(validationError);
  const messageList = [];
  attributes.forEach((attribute) => {
    validationError[attribute].forEach((message) => {
      messageList.push(`${attribute} ${message}`);
    });
  });
  return messageList;
}

export { api, get, post, put, destroy };
import axios from 'axios';
import { NumberInfo } from '../types';

const BASE_URL = 'http://numbersapi.com';

export const getNumberInfo = async (
  number: string | number,
  type: 'math' | 'trivia' | 'date' | 'year'
): Promise<NumberInfo> => {
  try {
    const response = await axios.get(`${BASE_URL}/${number}/${type}?json`);
    return {
      text: response.data.text,
      number: response.data.number,
      found: response.data.found,
      type: type
    };
  } catch (error) {
    throw new Error('Failed to fetch number information');
  }
};

export const getRandomNumberInfo = async (
  type: 'math' | 'trivia' | 'date' | 'year'
): Promise<NumberInfo> => {
  try {
    const response = await axios.get(`${BASE_URL}/random/${type}?json`);
    return {
      text: response.data.text,
      number: response.data.number,
      found: response.data.found,
      type: type
    };
  } catch (error) {
    throw new Error('Failed to fetch random number information');
  }
}; 
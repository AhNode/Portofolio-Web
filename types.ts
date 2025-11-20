
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface PortfolioItem {
  id: string;
  title: string;
  role: string; // Was genre
  year: string; // Was day
  image: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  PORTFOLIO = 'portfolio',
  ABOUT = 'about',
  CONTACT = 'contact',
}

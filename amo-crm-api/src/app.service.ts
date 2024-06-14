import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AmoCRMService {
  private readonly accessToken: string;
  private readonly baseUrl: string;

  constructor() {
    this.accessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkwMzFiM2E4NThkMzdjYjA2ZTQ5OTQ5MTEyNTk2NzI2MGEzNzAzMmJjNTJiNTE1ZWFkOTY2YzA5ZWRiY2UyYWYwN2U4OTcxMjYzOWVkZWY3In0.eyJhdWQiOiI3MzY2ZTBjYi0zMDc0LTQ2MzItODY3NS04Mzc5ZjU0ZmM2NjYiLCJqdGkiOiI5MDMxYjNhODU4ZDM3Y2IwNmU0OTk0OTExMjU5NjcyNjBhMzcwMzJiYzUyYjUxNWVhZDk2NmMwOWVkYmNlMmFmMDdlODk3MTI2MzllZGVmNyIsImlhdCI6MTcxODI5ODAwNSwibmJmIjoxNzE4Mjk4MDA1LCJleHAiOjE3MzgyODE2MDAsInN1YiI6IjExMTU2ODUwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNzk5NDMwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZTYxNmE2OTktMzIxOC00ZTU5LWFmN2UtODAyZGVlNjY3NjBjIn0.bhbXkA8w7ygKZi1DzE6HIjvA3hNaB8kI4PTwrvh5Ww5g_Y9SM50wJEo2Tv6NSGnJJDHwsArkfPRHO5NRDY_jD4Aa5wTqamKSXSDmzkvfeqnLc6QvRSAB_1g_7scEP7qXLcGMPPeAM2b69v2nUm7qMVYG1ClqM642otPz4KxvpPqHMDLOaFakJvzWVi6nXUAHwa89C7q6SAQOq5Kw2R_K7qyjfHlBC8U4kY6RVLS6rA5fxkeI9xDRQ8ixzVY-zpBwQpkZPfhyyXmSeXMHLdr9M18__aOOnwXiFVuN4ZLUVb0e_0-CjETL9EgM17bzXgrEwiL9GyGfuJ5zfgaFQkFAMw';
    this.baseUrl = 'https://max7ton.amocrm.ru/api/v4';
  }

  private async fetchFromAmoCRM(
    endpoint: string,
    params: any = {},
  ): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params,
    });

    return response.data;
  }

  async getDeals(query?: string, page: number = 1): Promise<any[]> {
    const params: any = { page, limit: 20 };
    if (query && query.length >= 3) {
      params.query = query;
    }
    const dealsResponse = await this.fetchFromAmoCRM('leads', params);
    return dealsResponse._embedded.leads;
  }

  async getContacts(): Promise<any[]> {
    const contactsResponse = await this.fetchFromAmoCRM('contacts', {
      limit: 250,
    });
    return contactsResponse._embedded.contacts;
  }

  async getContactByResponsibleUserId(responsibleUserId: number): Promise<any> {
    const contacts = await this.getContacts();
    return contacts.find(
      (contact: any) => contact.responsible_user_id === responsibleUserId,
    );
  }

  async getCompanyById(companyId: number): Promise<any> {
    const companyResponse = await this.fetchFromAmoCRM(
      `companies/${companyId}`,
    );
    return companyResponse;
  }

  async getStatuses(): Promise<any[]> {
    const pipelinesResponse = await this.fetchFromAmoCRM('leads/pipelines');
    const pipelines = pipelinesResponse._embedded.pipelines;
    const statuses = pipelines.reduce((acc, pipeline) => {
      return [...acc, ...pipeline._embedded.statuses];
    }, []);
    return statuses;
  }
}

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AmoCRMService } from './app.service';

@Controller('amo-crm')
export class AmoCRMController {
  constructor(private readonly amoCRMService: AmoCRMService) {}

  @Get('deals')
  async getDeals(@Query('query') query: string, @Query('page') page: number) {
    try {
      const deals = await this.amoCRMService.getDeals(query, page);
      const statuses = await this.amoCRMService.getStatuses();

      const dealsWithContactsAndCompanies = await Promise.all(
        deals.map(async (deal: any) => {
          const contact =
            await this.amoCRMService.getContactByResponsibleUserId(
              deal.responsible_user_id,
            );
          const company = deal._embedded.companies?.[0]?.id
            ? await this.amoCRMService.getCompanyById(
                deal._embedded.companies[0].id,
              )
            : null;
          const status = statuses.find((s: any) => s.id === deal.status_id);

          return {
            id: deal.id,
            name: deal.name,
            stage: status ? status.name : 'Unknown',
            budget: deal.price,
            contact: contact
              ? {
                  name: `${contact.first_name} ${contact.last_name}`,
                  email:
                    contact.custom_fields_values?.find(
                      (field: any) => field.field_code === 'EMAIL',
                    )?.values?.[0]?.value || 'N/A',
                }
              : null,
            company: { name: company.name || 'N/A' },
          };
        }),
      );

      return { deals: dealsWithContactsAndCompanies };
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

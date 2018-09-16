import { Query, Resolver, ResolveProperty, Mutation } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard/AuthGuard.guard';
import { UserService } from '../user/user.service';
import { LogService } from '../log';
import { ProjectService } from '../project';

@Resolver('Invoice')
export class InvoiceResolver {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly logService: LogService,
  ) {}

  @Query('allInvoices')
  @UseGuards(AuthGuard)
  async allInvoices(obj, args, { user }, info) {
    const invoices: Invoice[] = await this.invoiceService.findAll(user.id);
    return { invoices };
  }

  @Query('oneInvoice')
  @UseGuards(AuthGuard)
  async oneInvoice(obj, { input }, { user }, info) {
    const invoice: Invoice = await this.invoiceService.findOne(input, user.id);
    return { invoice };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createInvoice(obj, { input }, { user }, info) {
    const newInvoice: Invoice = await this.invoiceService.create(
      input,
      user.id,
    );
    return { invoice: newInvoice };
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async deleteInvoice(obj, { input: { id } }, { user }, info) {
    const invoice: Invoice = await this.invoiceService.delete(id, user.id);
    return { invoice };
  }

  @ResolveProperty('logs')
  async getLogs(invoice: Invoice, _, { user }) {
    const logs = [];
    for (const log of invoice.logs) {
      const newLog = await this.logService.findOne(log.id, user.id);
      logs.push(newLog);
    }
    return logs;
  }
}

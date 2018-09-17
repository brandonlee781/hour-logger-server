import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DontbeaModule } from './modules/dontbea/dontbea.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { LogModule } from './modules/log/log.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
      tracing: true,
      path: '/api/graphql',
      context: ({ req, res }) => ({
          request: req,
      }),
      rootValue: ({ req }) => ({ req }),
    }),
    AuthModule,
    DontbeaModule,
    InvoiceModule,
    LogModule,
    ProjectModule,
    ReportModule,
    TaskModule,
    UserModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private readonly graphQLFactory: GraphQLFactory) {}

  // configure(consumer: MiddlewareConsumer) {
  //   const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
  //   const schema = this.graphQLFactory.createSchema({ typeDefs });

  //   consumer
  //     .apply(graphqlExpress(req => ({ schema, rootValue: req, context: req })))
  //     .forRoutes('/api/graphql')
  //     .apply(graphiqlExpress({ endpointURL: '/api/graphql' }))
  //     .forRoutes('/api/graphiql');
  // }
}

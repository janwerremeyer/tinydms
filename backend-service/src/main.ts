import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {ConvertFieldErrorsToHttpException, ConvertToFieldErrors} from "./lib/validation/fieldErrorConverter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({credentials: true, preflightContinue: false, optionsSuccessStatus: 204, origin: "http://localhost:5173"})

    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (validationErrors) => {
                const fieldErrors = ConvertToFieldErrors(validationErrors);
                return ConvertFieldErrorsToHttpException(fieldErrors);
            }
        })
    );

    await app.listen(3000);
}

bootstrap();

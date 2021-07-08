import { environment } from 'src/environments/environment';

export abstract class AppConfig {
    static baseUrl = environment.baseUrl;
    static disqusShortname = 'viqas';
};

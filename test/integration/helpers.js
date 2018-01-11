import supertest from 'supertest';
import chai from 'chai';
import server from '../../app';

global.server = server;
global.request = supertest(server);
global.expect = chai.expect;

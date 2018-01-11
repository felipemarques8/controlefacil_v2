import supertest from 'supertest';
import chai from 'chai';
import Joi from 'joi';
import joiAssert from 'joi-assert';
import server from '../../app';

global.server = server;
global.request = supertest(server);
global.expect = chai.expect;
global.Joi = Joi;
global.joiAssert = joiAssert;

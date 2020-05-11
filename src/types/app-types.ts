import { Connection } from 'typeorm';
import express from 'express';

export type Main = () => Promise<express.Application | null>;

export type Bootstrap = (conn: Connection) => Promise<express.Application>;

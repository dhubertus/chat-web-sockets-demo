const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

$(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });

  io.emit('some event', { for: 'everyone' });

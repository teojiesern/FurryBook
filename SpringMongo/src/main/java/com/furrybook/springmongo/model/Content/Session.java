package com.furrybook.springmongo.model.Content;

import java.util.LinkedList;

import lombok.Data;

@Data
public class Session {
    private LinkedList<String> sessionStorage = new LinkedList<>();
}

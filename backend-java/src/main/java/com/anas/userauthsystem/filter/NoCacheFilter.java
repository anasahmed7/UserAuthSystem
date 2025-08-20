package com.anas.userauthsystem.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;

/**
 * This filter forces the browser to always fetch fresh content from the server.
 * Helps prevent the "back button" problem after sign-out where old pages show up from cache.
 */
@Component
public class NoCacheFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Tell modern browsers (HTTP/1.1) not to store anything
        httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        httpResponse.setHeader("Pragma", "no-cache");

        httpResponse.setDateHeader("Expires", 0);

        chain.doFilter(request, response);
    }
}

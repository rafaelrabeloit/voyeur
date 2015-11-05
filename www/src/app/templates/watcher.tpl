<li>
    <div class="target"><%= target %></div>
    <button type="button" class="btn btn-lg btn-default del-watcher">X</button>
    <button type="button" class="btn btn-primary enable-watcher <%= !enabled ? 'active' : '' %>" data-toggle="button" aria-pressed="<%= enabled %>" autocomplete="off">
          Disabled
    </button>
</li>
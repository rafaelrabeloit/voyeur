<div class="target"><%= model.get("target") %></div>
<button type="button" class="btn btn-lg btn-default del-watcher">X</button>
<button type="button" class="btn btn-primary enable-watcher <%= !model.get("enabled") ? 'active' : '' %>" data-toggle="button" aria-pressed="<%= !model.get("enabled") %>" autocomplete="off">
      Disabled
</button>
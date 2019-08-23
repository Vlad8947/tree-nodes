package ru.vlad.treenodes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.vlad.treenodes.entity.Node;
import ru.vlad.treenodes.service.NodeService;

import java.util.List;

@RestController
@RequestMapping("/api/node")
public class NodeController {

    @Autowired
    private NodeService nodeService;

    public NodeController() {
    }

    @PutMapping
    @ResponseBody
    public Node put(@RequestBody Node node) {
        return nodeService.save(node);
    }

    @DeleteMapping
    public void delete(@RequestParam long id) {
        nodeService.delete(id);
    }

    @DeleteMapping("/clear")
    public void clear() {
        nodeService.clear();
    }

    @GetMapping
    @ResponseBody
    public Node get(@RequestParam long id) {
        return nodeService.get(id);
    }

    @GetMapping("/root")
    @ResponseBody
    public List<Node> getRootNodes() {
        return nodeService.getRoot();
    }

    @GetMapping("/children")
    @ResponseBody
    public List<Node> getChildren(@RequestParam long parentId) {
        return nodeService.getChildren(parentId);
    }

}

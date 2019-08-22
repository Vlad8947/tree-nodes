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

    @RequestMapping(method = RequestMethod.PUT)
    public void put(@RequestBody Node node) {
        nodeService.save(node);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public void delete(@RequestParam long id) {
        nodeService.delete(id);
    }

    @RequestMapping("/clear")
    public void clear() {
        nodeService.clear();
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Node get(@RequestParam long id) {
        return nodeService.get(id);
    }

    @RequestMapping("/root")
    @ResponseBody
    public List<Node> getRootNodes() {
        return nodeService.getRoot();
    }

    @RequestMapping("/children")
    @ResponseBody
    public List<Node> getChildren(@RequestParam long id) {
        return nodeService.getChildren(id);
    }

}
